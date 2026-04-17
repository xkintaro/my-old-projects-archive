<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="kayitBasarili.aspx.cs" Inherits="assets_pages_userPages_kayitBasarili" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>TEKNOFİLM - E-POSTA DOĞRULAMA</title>
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

            .hakkimda-title h1 {
                color: greenyellow;
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
            height: 35px;
            color: #fff;
            text-align: center;
            margin-bottom: 20px;
            cursor: pointer;
        }

        .kodal-btn {
            background-color: hsla(218, 39%, 14%, 0.8);
            width: 100px;
            border-radius: 10px;
            height: 35px;
            color: #fff;
            cursor: pointer;
            text-align: center;
            margin-left: 5px;
        }

        .txtbx:focus {
            border: 1px solid #2566ff;
        }

        .btnn:hover {
            border: 1px solid #2566ff;
        }

        .kodal-btn:hover {
            border: 1px solid #2566ff;
        }

        .dogrulatxt {
            margin-bottom: 10px;
            text-align:center;
            width:100%;
        }

            .dogrulatxt span {
                color: lightcoral;
                text-decoration:underline;
            }
            .btnbasarli{
                   color: lightcoral;
                text-decoration:underline;
            }

        .kayit-ol {
            display: block;
            width: 250px;
            padding: 10px;
            margin: 0 auto;
        }

        .kyt-cont {
            display: flex;
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
                        <h1>KAYIT BAŞARILI</h1>
                    </div>
                    <div class="hakkimda-content">
                        <div class="giris-form">
                            <div class="giris-form-controller">
                                <p class="dogrulatxt">Lütfen giriş yapmak için <asp:Button ID="Button1" CssClass="btnbasarli" runat="server" Text="Tıklayınız" OnClick="Button1_Click" /> </p>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </main>
     <script src="../../js/main.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</asp:Content>

