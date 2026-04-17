using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
using System.Net.Mail;
public partial class assets_pages_userPages_kayit : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

     public static bool kontrol(string email)
    {
        try
        {
            MailAddress m = new MailAddress(email);
            return true;
        }
        catch
        {
            return false;
        }
    }
 
    protected void Page_Load(object sender, EventArgs e)
    {
        bool varmi = false;
        baglanti.Close();
        baglanti.Open();
        OleDbCommand liste = new OleDbCommand("select * from kullanicilar", baglanti);
        OleDbDataReader oku = liste.ExecuteReader();
        while (oku.Read())
        {
            string kullaniciAdi = oku["kadi"].ToString();
            if (Session["kadi"] == kullaniciAdi)
            {
                Response.Redirect("~/assets/pages/hesabim.aspx");
            }
        }
        baglanti.Close();
    }

    protected void ButtonKayit_Click(object sender, EventArgs e)
    {
        string epostakontroldurum = TextBoxEposta.Text;
        bool posta = kontrol(epostakontroldurum.ToString());
        Label1.Text = posta.ToString();
        if (posta == true)
        {
            if (TextBoxKullaniciAdi.Text != "" && TextBoxEposta.Text != "" && TextBoxSifre.Text != "" && TextBoxSifreTekrar.Text != "")
            {
                bool used = false;
                bool kadiUsed = false;
                bool epostaUsed = false;
                baglanti.Close();
                baglanti.Open();
                OleDbCommand liste = new OleDbCommand("select * from kullanicilar", baglanti);
                OleDbDataReader oku = liste.ExecuteReader();
                while (oku.Read())
                {
                    string kullaniciAdi = oku["kadi"].ToString();
                    string eposta = oku["eposta"].ToString();

                    if (kullaniciAdi == TextBoxKullaniciAdi.Text || eposta == TextBoxEposta.Text)
                    {
                        used = true;
                        if (kullaniciAdi == TextBoxKullaniciAdi.Text && eposta == TextBoxEposta.Text)
                        {
                            Label1.Text = "Kullanıcı adı ve mail adresi kullanılıyor.";
                            Label1.ForeColor = System.Drawing.Color.Red;
                        }
                        else if (kullaniciAdi == TextBoxKullaniciAdi.Text)
                        {
                            Label1.Text = "Bu kullanıcı adı daha önce kullanılmış.";
                            Label1.ForeColor = System.Drawing.Color.Red;
                        }
                        else if (eposta == TextBoxEposta.Text)
                        {
                            Label1.Text = "Bu mail adresi daha önce kullanılmış.";
                            Label1.ForeColor = System.Drawing.Color.Red;
                        }
                    }
                }
                if (used == true)
                {
                    //Label1.Text = "Bu bilgiler daha önce kullanılmış.";
                }
                else
                {
                    if (TextBoxKullaniciAdi.Text.Length < 4)
                    {
                        Label1.Text = "Kullanıcı Adı Yeterince Uzun Değil";
                        Label1.ForeColor = System.Drawing.Color.Red;
                    }
                    else if (TextBoxKullaniciAdi.Text.Length > 12)
                    {
                        Label1.Text = "Kullanıcı Adı Çok Uzun";
                        Label1.ForeColor = System.Drawing.Color.Red;
                    }
                    else if (TextBoxSifre.Text.Length < 8 || TextBoxSifreTekrar.Text.Length < 8)
                    {
                        Label1.Text = "Şifreniz Çok Kısa";
                        Label1.ForeColor = System.Drawing.Color.Red;
                    }
                    else
                    {
                        Random olustur = new Random();
                        int say = olustur.Next(100000000, 999999999);
                        Session["id-kayit"] = say;
                        Session["kadi-kayit"] = TextBoxKullaniciAdi.Text;
                        Session["eposta-kayit"] = TextBoxEposta.Text;
                        Session["avatar-kayit"] = "user-profile.png";
                        Session["biyografi-kayit"] = "Hakkımda bilgisi yok.";
                        if (TextBoxSifre.Text == TextBoxSifreTekrar.Text)
                        {
                            Session["sifre-kayit"] = TextBoxSifre.Text;
                            Response.Redirect("~/assets/pages/userPages/dogrulama.aspx");
                        }
                        else
                        {
                            Label1.Text = "Şifreler Uyuşmuyor.";
                            Label1.ForeColor = System.Drawing.Color.Red;
                        }
                    }
                }
            }
            else
            {
                Label1.Text = "Gerekli olan tüm bilgileri giriniz.";
                Label1.ForeColor = System.Drawing.Color.Red;
            }
        }
        else
        {
            Label1.Text = "Lütfen geçerli bir mail adresi giriniz.";
            Label1.ForeColor = System.Drawing.Color.Red;
        }

    }
}