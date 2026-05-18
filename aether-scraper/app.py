from flask import Flask, render_template, request, Response, jsonify
import json
import os
from bot_engine import BotMotoru

app = Flask(__name__)
CONFIG_FILE = 'config.json'

def load_config():
    if not os.path.exists(CONFIG_FILE):
        print(f"Error: {CONFIG_FILE} not found!")
        return {}
        
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_config(data):
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        config = load_config()
        
        if 'credentials' not in config: config['credentials'] = {}
        if 'settings' not in config: config['settings'] = {}

        config['credentials']['email'] = request.form.get('email')
        config['credentials']['password'] = request.form.get('password')
        config['settings']['start_id'] = int(request.form.get('start_id'))
        config['settings']['end_id'] = int(request.form.get('end_id'))
        
        keys = request.form.getlist('field_key[]')
        selectors = request.form.getlist('field_selector[]')
        types = request.form.getlist('field_type[]')
        
        new_fields = []
        for i in range(len(keys)):
            if keys[i].strip(): 
                new_fields.append({
                    "key": keys[i],
                    "selector": selectors[i],
                    "type": types[i]
                })
        config['fields'] = new_fields
        
        save_config(config)
        return jsonify({"status": "success", "message": "Settings saved successfully!"})

    config = load_config()
    if 'fields' not in config: config['fields'] = []
    if 'credentials' not in config: config['credentials'] = {'email': '', 'password': ''}
    if 'settings' not in config: config['settings'] = {'start_id': 0, 'end_id': 0}

    return render_template('index.html', config=config)

@app.route('/start-stream')
def start_stream():
    config = load_config()
    bot = BotMotoru(config)
    
    def generate():
        for log in bot.calistir():
            yield f"{log}\n"
            
    return Response(generate(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True, port=5000)