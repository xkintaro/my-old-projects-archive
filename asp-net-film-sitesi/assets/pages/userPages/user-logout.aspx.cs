using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class assets_pages_userPages_user_logout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session["id"] = null;
        Session["kadi"] = null;
        Session["eposta"] = null;
        Session["avatar"] = null;
        Response.Redirect("~/Default.aspx");
    }
}