<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="admin_login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>TEKNOFİLM - GİRİŞ
    </title>
    <style>
        .movies-grid {
            display: block;
        }

        .hakkimda {
            background-color: hsla(218, 39%, 14%, 0.8);
            min-height: 600px;
            width: 100%;
            border-radius: 10px;
        }

        .hakkimda-title {
            text-align: center;
            padding: 20px 0;
        }

        .hakkimda-content {
            height: 100%;
            padding: 10px 2%;
        }

        .giris-form {
            background-color: hsl(219, 32%, 10%);
            margin: 20px auto;
            width: 400px;
            padding: 20px;
            border-radius: 10px;
        }

        .giris-form-controller {
            margin: 10px;
            display: flex;
        }

        .txtbx:focus {
            border: 1px solid #2566ff;
        }

        .btnn:hover {
            border: 1px solid #2566ff;
        }

        .txtbx {
            background-color: hsla(218, 39%, 14%, 0.8);
            width: 100%;
            border-radius: 10px;
            padding-left: 10px;
            height: 35px;
            color: #fff;
        }

        .btnn {
            background-color: hsla(218, 39%, 14%, 0.8);
            min-width: 120px;
            border-radius: 10px;
            padding-left: 10px;
            height: 40px;
            cursor: pointer;
            color: #fff;
            text-align: center;
            position: relative;
            left: 50%;
            margin-bottom: 20px;
            transform: translateX(-50%);
        }

        .kayit-ol {
            display: block;
            width: 200px;
            padding: 10px;
            margin: 0 auto;
        }

        .kyt-cont {
            display: flex;
        }

        .btn-kayit {
            min-width: 150px;
            border-radius: 10px;
            padding-top: 10px;
            height: 40px;
            text-decoration: underline;
            margin-bottom: 20px;
            color: #fff;
            text-align: center;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }

        @media only screen and (max-width: 475px) {
            .giris-form {
                width: 100%;
            }

            .btnn {
                width: 40%;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <main>
        <section class="movies">
            <div class="filter-bar">
                &nbsp;
            </div>
            <div class="movies-grid">
                <div class="hakkimda">
                    <div class="hakkimda-title">
                        <h1>ADMİN GİRİŞİ</h1>
                    </div>
                    <div class="hakkimda-content">
                        <div class="giris-form">
                            <div class="giris-form-controller">
                                <asp:TextBox ID="TextBoxKullaniciAdi" runat="server" CssClass="txtbx" placeholder="Kullanıcı Adı"></asp:TextBox>
                            </div>
                            <div class="giris-form-controller">
                                <asp:TextBox ID="TextBoxSifre" runat="server" CssClass="txtbx" placeholder="Şifre"></asp:TextBox>
                            </div>
                            <div class="giris-form-controller">
                                <asp:Button ID="ButtonGiris" runat="server" Text="GİRİŞ" CssClass="btnn" OnClick="ButtonGiris_Click" />
                            </div>
                            <div class="giris-form-controller">
                                <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
     <script src="../assets/js/main.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</asp:Content>

