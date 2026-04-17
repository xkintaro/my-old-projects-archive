using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
using System.Net;
using System.Net.Mail;

public partial class assets_pages_userPages_dogrulama : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    public void rasgelesayiolustur()
    {
        Random rnd = new Random();
        Session["rasgelesayi"] = rnd.Next(100000, 999999);
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

            if (Session["kadi-kayit"].ToString() == kullaniciAdi)
            {
                varmi = true;
                break;

            }
        }
        baglanti.Close();
        if (varmi == true)
        {
            Response.Redirect("~/assets/pages/hesabim.aspx");
        }
        if (Session["eposta-kayit"] == null)
        {
            Response.Redirect("~/assets/pages/userPages/kayit.aspx");
        }
        else
        {
            LabelEposta.Text = Session["eposta-kayit"].ToString();
        }
        if (!IsPostBack)
        {
            rasgelesayiolustur();
            LabelDurum.Text = IsPostBack.ToString();
            LabelDogrulamaKodu.Text = Session["rasgelesayi"].ToString();
        }
    }
    protected void ButtonDogrula_Click(object sender, EventArgs e)
    {
        if (TextBoxDogrulamaKodu.Text == Session["rasgelesayi"].ToString())
        {
            baglanti.Close();
            baglanti.Open();
            OleDbCommand kaydet = new OleDbCommand("insert into kullanicilar(id,kadi,eposta,sifre,profilresmi,biyografi)values(@1,@2,@3,@4,@5,@6)", baglanti);
            kaydet.Parameters.AddWithValue("@1", Session["id-kayit"]);
            kaydet.Parameters.AddWithValue("@2", Session["kadi-kayit"]);
            kaydet.Parameters.AddWithValue("@3", Session["eposta-kayit"]);
            kaydet.Parameters.AddWithValue("@4", Session["sifre-kayit"]);
            kaydet.Parameters.AddWithValue("@5", "user-profile.png");
            kaydet.Parameters.AddWithValue("@5", Session["biyografi-kayit"].ToString());
            kaydet.ExecuteNonQuery();
            baglanti.Close();
            LabelDurum.Text = "Kayıt başarılı.";
            LabelDurum.ForeColor = System.Drawing.Color.Green;
            Session["id"] = null;
            Session["kadi"] = null;
            Session["eposta"] = null;
            Session["sifre"] = null;
            Response.Redirect("~/assets/pages/userPages/kayitBasarili.aspx");
        }
        else
        {
            LabelDurum.Text = "Doğrulama Kodu Yanlış.";
            LabelDurum.ForeColor = System.Drawing.Color.Red;
        }
    }

    protected void ButtonYenidenKodAl_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/yenidenKodAl.aspx");
    }
}