using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["kadi"] == null)
        {
            LabelHesabim.Text = "Hesabım";
            ImageProfile.ImageUrl = "~/assets/userProfileimage/user-profile.png";
        }
        else
        {
            LinkButton1.Text = Session["kadi"].ToString();
            ImageProfile.ImageUrl = "~/assets/userProfileimage/" + Session["avatar"];
        }
    }
    protected void ButtonAnasayfa_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/Default.aspx");
    }
    protected void ButtonHakkimda_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/hakkimda.aspx");
    }
    protected void ButtonKategoriler_Click1(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/kategoriler.aspx");
    }

    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/assets/pages/userPages/giris.aspx");
    }

    protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
    {
        Response.Redirect("~/Default.aspx");
    }
}
