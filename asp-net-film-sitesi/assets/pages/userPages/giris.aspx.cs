using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
public partial class assets_pages_userPages_giris : System.Web.UI.Page
{

    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["kadi"] != null)
        {
            Response.Redirect("~/assets/pages/hesabim.aspx");
        }
    }
    protected void ButtonGiris_Click(object sender, EventArgs e)
    {
        bool varmi = false;
        baglanti.Close();
        baglanti.Open();
        OleDbCommand liste = new OleDbCommand("select * from kullanicilar", baglanti);
        OleDbDataReader oku = liste.ExecuteReader();
        while (oku.Read())
        {
            Session["kullaniciID"] = oku["id"].ToString();
            Session["kullaniciAdi"] = oku["kadi"].ToString();
            Session["epostaaa"] = oku["eposta"].ToString();
            Session["sifreee"] = oku["sifre"].ToString();
            Session["profilresmiii"] = oku["profilresmi"].ToString();
            Session["biyografiii"] = oku["biyografi"].ToString();
            if (TextBoxKullaniciAdi.Text == Session["kullaniciAdi"].ToString() && TextBoxSifre.Text == Session["sifreee"].ToString())
            {
                varmi = true;
                Session["id"] = Session["kullaniciID"];
                Session["kadi"] = Session["kullaniciAdi"];
                Session["eposta"] = Session["epostaaa"];
                Session["sifre"] = Session["sifreee"];
                Session["avatar"] = Session["profilresmiii"];
                Session["biyografi"] = Session["biyografiii"];
                break;

            }
        }
        baglanti.Close();
        if (varmi == true)
        {
            Response.Redirect("~/assets/pages/hesabim.aspx");
        }
        else
        {
            Label1.ForeColor = System.Drawing.Color.Red;
            Label1.Text = "Kullanıcı bulunamadı.";
        }
    }
}