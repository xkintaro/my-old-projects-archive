<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>PageList</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            text-decoration: none;
            list-style: none;
            box-sizing: border-box;
            font-family: sans-serif;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            height: 4000px;
        }

        .title {
            text-align: center;
            width: 100%;
            padding: 30px 0;
            font-size: 40px;
        }

        .main {
            display: block;
        }

        .box {
            background-color: lightgray;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            width: 300px;
            margin: 10px auto;
        }

        .img {
            border-radius: 10px;
            width: 100%;
            height: auto;
        }

        label {
            font-size: 30px;
            margin: 10px;
        }

        .btn {
            background-color: lightgray;
            margin-top: 20px;
            display: flex;
            border-radius: 10px;
            padding: 30px;
            justify-content: space-between;
        }

        .big {
            width: 150px;
            height: 50px;
            font-size: 16px;
        }

        .ml {
            width: 50px;
            height: 50px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="title">
                <h1>SON EKLENENLER</h1>
                <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
            </div>
            <div class="main">
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                        <a href="https://meb.gov.tr" target="_blank">
                            <div class="box">
                                <div class="resim">
                                    <asp:Image CssClass="img" ID="Image1" ImageUrl='<%# Bind("resim", "~/img/{0}") %>' runat="server" />
                                </div>
                                <div class="ad">
                                    <label><%#Eval("ad") %></label>
                                </div>
                            </div>
                        </a>
                    </ItemTemplate>
                </asp:Repeater>

            </div>
            <div class="btn">
                <div class="ileri">
                    <asp:Button CssClass="big" ID="BtnGeri" runat="server" Text="GERİ" OnClick="BtnGeri_Click" />
                </div>
                <div class="multi">
                    <label>
                        Sayfa:
                        <asp:Label ID="Labelsayac" runat="server" Text="Label"></asp:Label></label>
                </div>
                <div class="geri">
                    <asp:Button CssClass="big" ID="Btnileri" runat="server" Text="iLERi" OnClick="Btnileri_Click" />
                </div>

            </div>
        </div>

    </form>
</body>
</html>