using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;
public partial class _Default : System.Web.UI.Page
{

    OleDbConnection baglanti = new OleDbConnection("Provider=Microsoft.Jet.OleDB.4.0; Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/veri.mdb"));

    protected void Page_Load(object sender, EventArgs e)
    {
        Label1.Text = IsPostBack.ToString();

        if (!IsPostBack)
        {
            Session["sayfaSayac"] = 1;
            Labelsayac.Text = Session["sayfaSayac"].ToString();
            Session["first"] = 1;
            Session["last"] = 2;
            yukleee();
        }
        if (Session["first"].ToString() == "1")
        {
            BtnGeri.Enabled = false;
        }
    }

    public void yukleee()
    {
        OleDbDataAdapter yukle = new OleDbDataAdapter("SELECT * from urun where id BETWEEN " + " " + Session["first"] + " " + " AND " + " " + Session["last"], baglanti);
        DataTable dt = new DataTable();
        yukle.Fill(dt);
        Repeater1.DataSource = dt;
        Repeater1.DataBind();
    }

    protected void BtnGeri_Click(object sender, EventArgs e)
    {
        int sayac = Convert.ToInt32(Session["sayfaSayac"]);
        sayac -= 1;
        Session["sayfaSayac"] = sayac;
        Labelsayac.Text = Session["sayfaSayac"].ToString();

        int sayfirst = Convert.ToInt32(Session["first"]);
        sayfirst -= 2;
        Session["first"] = sayfirst;

        int saylast = Convert.ToInt32(Session["last"]);
        saylast -= 2;
        Session["last"] = saylast;
        yukleee();

        if (Session["first"].ToString() != "1")
        {
            BtnGeri.Enabled = true;
        }
        else
        {
            BtnGeri.Enabled = false;
        }
    }

    protected void Btnileri_Click(object sender, EventArgs e)
    {
        int sayac = Convert.ToInt32(Session["sayfaSayac"]);
        sayac += 1;
        Session["sayfaSayac"] = sayac;
        Labelsayac.Text = Session["sayfaSayac"].ToString();

        int sayfirst = Convert.ToInt32(Session["first"]);
        sayfirst += 2;
        Session["first"] = sayfirst;

        int saylast = Convert.ToInt32(Session["last"]);
        saylast += 2;
        Session["last"] = saylast;
        yukleee();

        if (Session["first"].ToString() != "1")
        {
            BtnGeri.Enabled = true;
        }
    }
}