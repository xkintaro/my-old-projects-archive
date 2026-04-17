using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
public partial class assets_pages_hesabim : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["kadi"] == null)
        {
            Response.Redirect("~/assets/pages/userPages/giris.aspx");

        }
        else
        {
            LabelHosgeldin.Text =  Session["kadi"].ToString();
            LabelHosgeldin.ForeColor = Color.Aqua;
            LabelKullaniciAdi.Text = Session["kadi"].ToString();
            LabelKullaniciID.Text = "ID " + Session["id"].ToString();
            Image1.ImageUrl = "~/assets/userProfileimage/" + Session["avatar"];
            LabelBiografi.Text = Session["biyografi"].ToString();

            LabelBiografiPhone.Text = Session["biyografi"].ToString();

            if (LabelBiografi.Text == "Hakkımda bilgisi yok.")
            {
                LabelBiografi.ForeColor = System.Drawing.Color.LightSlateGray;
            }
            else
            {
                LabelBiografi.ForeColor = System.Drawing.Color.White;
            }
        }
    }

    protected void ButtonCikis_Click1(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/user-logout.aspx");
    }

    protected void ButtonProfileSettings_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/profilGuncelle.aspx");
    }

    protected void ButtonProfileSettingPhone_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/profilGuncelle.aspx");
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/user-logout.aspx");
    }
}