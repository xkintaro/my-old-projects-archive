using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Data;
using System.Data.OleDb;
using System.Net.Mail;
public partial class assets_pages_hakkimda : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        if (TextBoxkadi.Text == "" || TextBoxMetin.Text == "")
        {
            Label1.Text = "Boş mesaj gönderilemez";
            Label1.ForeColor = Color.Red;
        }
        else
        {
            baglanti.Close();
            baglanti.Open();
            OleDbCommand kayet = new OleDbCommand("insert into mesajlar(kadi,metin)values(@1,@2)", baglanti);
            kayet.Parameters.AddWithValue("@1", TextBoxkadi.Text);
            kayet.Parameters.AddWithValue("@2", TextBoxMetin.Text);
            kayet.ExecuteNonQuery();
            baglanti.Close();
            Label1.Text = "Mesajınız sisteme gönderilmiştir.";
            Label1.ForeColor = Color.Green;
            TextBoxkadi.Text = ""; 
            TextBoxMetin.Text = "";
        }
    }
}