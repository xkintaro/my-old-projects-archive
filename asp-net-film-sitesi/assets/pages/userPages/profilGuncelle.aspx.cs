using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
public partial class assets_pages_userPages_profilGuncelle : System.Web.UI.Page
{
    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {

        if (Session["kadi"] == null)
        {
            Response.Redirect("~/assets/pages/userPages/giris.aspx");
        }
        else
        {
            if (!IsPostBack)
            {
                TextBoxKadi.Text = Session["kadi"].ToString();
                TextBoxEposta.Text = Session["eposta"].ToString();
                TextBoxSifre.Text = "********";
                Image1.ImageUrl = "~/assets/userProfileimage/" + Session["avatar"];
                TextBox1.Text = Session["biyografi"].ToString();
                TextBoxEposta.Enabled = false;
                TextBoxSifre.Enabled = false;
            }
        }
    }
    protected void ButtonİPTAL_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/hesabim.aspx");
    }

    protected void ButtonKAYDET_Click(object sender, EventArgs e)
    {
        Random rnd = new Random();
        int say = rnd.Next(100000, 999999);
        if (TextBoxKadi.Text.Length > 12)
        {
            Label1.Text = "Kullanici Adı çok uzun - max(12)";
            Label1.ForeColor = Color.Red;
        }
        else if (TextBoxKadi.Text.Length < 4)
        {
            Label1.Text = "Kullanici Adı çok kısa - min(4)";
            Label1.ForeColor = Color.Red;
        }
        else
        {
            baglanti.Close();
            baglanti.Open();
            OleDbCommand kaydet = new OleDbCommand("Update kullanicilar set kadi=@1  where id=@3", baglanti);
            kaydet.Parameters.AddWithValue("@1", TextBoxKadi.Text);
            kaydet.Parameters.AddWithValue("@3", Session["id"].ToString());
            kaydet.ExecuteNonQuery();
            baglanti.Close();
            Session["kadi"] = TextBoxKadi.Text;
            Label1.Text = "KAYDEDİLDİ";
            Label1.ForeColor = Color.Green;
        }
        if (TextBox1.Text.Length >= 101)
        {
            Label1.Text = "Hakkımda bilgisi çok uzun - max(100)";
            Label1.ForeColor = Color.Red;
        }
        else
        {
            baglanti.Close();
            baglanti.Open();
            OleDbCommand kaydet = new OleDbCommand("Update kullanicilar set biyografi=@1  where id=@3", baglanti);
            kaydet.Parameters.AddWithValue("@1", TextBox1.Text);
            kaydet.Parameters.AddWithValue("@3", Session["id"].ToString());
            kaydet.ExecuteNonQuery();
            baglanti.Close();
            Session["biyografi"] = TextBox1.Text;
            Label1.Text = "KAYDEDİLDİ";
            Label1.ForeColor = Color.Green;
        }
        if (FileUpload1.HasFile == false)
        {
            Session["guncelleAvatar"] = Session["avatar"];
        }
        else
        {
            Session["guncelleAvatar"] = FileUpload1.FileName;
            baglanti.Open();
            FileUpload1.SaveAs(Server.MapPath("~/assets/userProfileimage/") + say + FileUpload1.FileName);
            OleDbCommand kaydet = new OleDbCommand("Update kullanicilar set profilresmi=@1  where id=@3", baglanti);
            kaydet.Parameters.AddWithValue("@1", say.ToString() + Session["guncelleAvatar"]);
            kaydet.Parameters.AddWithValue("@3", Session["id"].ToString());
            kaydet.ExecuteNonQuery();
            baglanti.Close();
            Session["avatar"] = say.ToString() + Session["guncelleAvatar"];
            Image1.ImageUrl = "~/assets/userProfileimage/" + Session["avatar"].ToString();
            Label1.Text = "KAYDEDİLDİ";
            Label1.ForeColor = Color.Green;
        }
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/epostaGuncelle.aspx");
    }

    protected void Button2_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/sifreGuncelle.aspx");
    }
}