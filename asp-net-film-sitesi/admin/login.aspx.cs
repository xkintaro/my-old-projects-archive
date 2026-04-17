using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;

public partial class admin_login : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void ButtonGiris_Click(object sender, EventArgs e)
    {
        bool varmi = false;
        string sorgu = "select * from admin";
        baglanti.Close();
        baglanti.Open();
        OleDbCommand liste = new OleDbCommand(sorgu, baglanti);
        OleDbDataReader oku = liste.ExecuteReader();
        while (oku.Read())
        {
            string kullaniciAdi = oku["kadi"].ToString();
            string sifre = oku["sifre"].ToString();
            if (TextBoxKullaniciAdi.Text == kullaniciAdi && TextBoxSifre.Text == sifre)
            {
                varmi = true;
                Session["kadi"] = kullaniciAdi;
                break;
            }
        }
        baglanti.Close();

        if (varmi == true)
        {
            Response.Redirect("~/Admin/Default.aspx");
        }
        else
        {
            Label1.ForeColor = System.Drawing.Color.Red;
            Label1.Text = "Kullanıcı bulunamadı.";
        }
    }
}