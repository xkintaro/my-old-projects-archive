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
public partial class assets_pages_userPages_sifreGuncelle : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["id"] == null)
        {
            Response.Redirect("~/assets/pages/userPages/giris.aspx");
        }

        if (!IsPostBack)
        {
            Label1.Text = Session["eposta"].ToString();
            TextBox1.Text = Session["sifre"].ToString();
            Random syas = new Random();
            Session["randomsayiii"] = syas.Next(100000, 999999);
        }
        Label3.Text = Session["randomsayiii"].ToString();
    }
    protected void ButtonİPTAL_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/profilGuncelle.aspx");
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (TextBox1.Text.Length < 8)
        {
            Label2.Text = "Şifreniz çok kısa.";
            Label2.ForeColor = Color.Red;
        }
        else
        {
            if (TextBox2.Text == Session["randomsayiii"].ToString())
            {
                baglanti.Close();
                baglanti.Open();
                OleDbCommand kaydet = new OleDbCommand("Update kullanicilar set sifre=@1  where id=@3", baglanti);
                kaydet.Parameters.AddWithValue("@1", TextBox1.Text);
                kaydet.Parameters.AddWithValue("@3", Session["id"].ToString());
                kaydet.ExecuteNonQuery();
                baglanti.Close();
                Session["sifre"] = TextBox1.Text;
                Label2.Text = "KAYDEDİLDİ";
                Label2.ForeColor = Color.Green;
                Response.Redirect("~/assets/pages/userPages/profilGuncelle.aspx");
            }
            else
            {
                Label2.Text = "Doğrulama kodunuz yanlış.";
                Label2.ForeColor = Color.Red; ;
            }
        }
    }

}
