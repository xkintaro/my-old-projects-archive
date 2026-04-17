require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require("./routes/auth.routes");
const userRoutes = require('./routes/user.routes');
const serverRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes');
const tagRoutes = require('./routes/tag.routes');

const PORT = process.env.BACKEND_PORT;
const MONGO_URL = process.env.MONGO_URL;

const { UPLOAD_DIR, THUMBNAILS_DIR, USER_PROFILES_DIR, SERVER_IMAGE_DIR } = require('./utils/constants');

const app = express();

/* ========== CORS ========== */
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

/* ========== ROUTES ========== */
app.use("/api/auth", authRoute);
app.use('/api/users', userRoutes);
app.use('/api/severs', serverRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/files', fileRoutes);

/* ========== STATIC FILES ========== */
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/thumbnails', express.static(THUMBNAILS_DIR));
app.use('/user-profiles', express.static(USER_PROFILES_DIR));
app.use('/server-images', express.static(SERVER_IMAGE_DIR));

app.get('/', (req, res) => res.send('Sunucu çalışıyor!'));

/* ========== MONGODB ========== */
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
})
    .then(() => console.log(`MongoDB bağlandı ${MONGO_URL}`))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));


/* ========== SERVER START ========== */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`📂 Dosya yükleme dizini: ${UPLOAD_DIR}`);
    console.log(`🖼 Thumbnail dizini: ${THUMBNAILS_DIR}`);
});
