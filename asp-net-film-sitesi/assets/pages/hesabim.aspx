<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="hesabim.aspx.cs" Inherits="assets_pages_hesabim" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>TEKNOFİLM - HESABIM


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
            padding-bottom: 10px;
        }

        .hakkimda-title {
            text-align: center;
            padding: 10px 0;
        }

        .btnn:hover {
            border: 1px solid #2566ff;
        }

        @media only screen and (max-width: 800px) {
            .hakkimda-content {
                display: block;
            }
        }

        .hakkimda-content {
            height: 100%;
            display: block;
            justify-content: space-between;
            padding: 10px 2%;
        }

        div {
            color: #fff;
        }

        .profile-head {
            display: flex;
            justify-content: space-around;
            width: 100%;
        }

        .profile-logo {
            min-width: 200px;
            height: 200px;
            border-radius: 10px;
        }

            .profile-logo .profile-img {
                border-radius: 10px;
                max-width: 200px;
            }

        .head-text {
            background-color: hsl(219, 32%, 10%);
            width: 90%;
            margin-left: 20px;
            border-radius: 10px;
        }

        .head-title {
            padding: 10px 0;
            width: 95%;
            border-bottom: 1px solid #fff;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }

        .head-bio {
            width: 95%;
            margin: 0 auto;
            padding: 10px 0;
            max-width: 900px;
            height: 130px;
            padding-top: 10px;
            word-wrap: break-word;
        }

        .kadi {
            font-weight: bold;
        }

        .id {
            font-size: 12px;
        }

        .favoriler {
            background-color: hsl(219, 32%, 10%);
            width: 100%;
            border-radius: 10px;
            margin-top: 20px;
            max-height: 460px;
            margin-bottom: 10px;
            padding: 10px;
        }

        .movies-grid2 {
            display: flex;
            overflow-y: scroll;
            gap: 30px;
            height: 390px;
            margin-bottom: 60px;
        }

        .movie-card {
            --scale: 0.8;
            cursor: pointer;
            min-width: 300px;
            height: 330px;
            border-radius: 20px;
            background-color: hsla(218, 39%, 14%, 0.8);
        }

            .movie-card .card-body {
                padding-left: 20px;
                padding-bottom: 20px;
                display: flex;
            }

        .sag {
            width: 100%;
            padding-left: 10px;
        }

        .movie-card .card-body .sol img {
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }

        .movie-card .card-body .sol {
            margin-right: 10px;
        }

        .uploader-profile span {
            font-size: 12px;
            font-weight: 400;
        }

        .movie-card .card-head {
            position: relative;
            height: 250px;
            border-radius: 15px;
            margin-bottom: 15px;
            overflow: hidden;
        }

        .movie-card:hover .card-img {
            transform: scale(1.1);
        }

        .favoriler-title h1 {
            margin-left: 10px;
            margin-bottom: 20px;
            text-decoration: underline;
        }

        .favoriler {
            height: 100%;
        }

        .ayarlar {
            display: flex;
        }

        .profilesetting {
            color: #fff;
            margin-left: 15px;
            cursor: pointer;
        }

        .head-text-phone {
            display: none;
        }

        .ayarlar-phone {
            display: none;
        }

        .profilesetting-phone {
            background-color: hsla(218, 39%, 14%, 0.8);
            width: 100%;
            padding: 10px 20px;
            display: flex;
            color: #fff;
            border-radius: 10px;
            margin: 20px auto;
            text-align: center;
        }

        .contt {
            background-color: hsla(218, 39%, 14%, 0.8);
            padding: 10px 5px;
            display: flex;
            color: #fff;
            border-radius: 10px;
            margin: 0 5px;
            font-size: 13px;
            text-align: center;
        }

        .contt2 {
            background-color: hsla(218, 39%, 14%, 0.8);
            padding: 10px 5px;
            display: flex;
            color: #fff;
            border-radius: 10px;
            font-size: 13px;
            text-align: center;
        }

        .contt:hover {
            border: 1px solid #2566ff;
        }

        .contt2:hover {
            border: 1px solid #2566ff;
        }

        .profilesetting-phone:hover {
            border: 1px solid #2566ff;
        }

        .profilesetting-phone-logout:hover {
            border: 1px solid #2566ff;
        }

        .profilesetting-phone-logout {
            background-color: hsla(218, 39%, 14%, 0.8);
            padding: 10px 10px;
            display: none;
            color: #fff;
            border-radius: 10px;
            text-align: center;
            width: 100px;
        }

        .yazi {
            color: #fff;
            margin: 0 auto;
        }

        .baslikkk {
            word-wrap: break-word;
        }

        @media only screen and (max-width: 700px) {
            .profile-head {
                display: block;
            }

            .hakkimda-content {
                padding: 0 2%;
            }

            .profile-logo {
                width: 100%;
            }

            .profilesetting-phone-logout {
                display: block;
                min-width: 100px;
            }


            .profile-img {
                width: 150px;
                height: 150px;
                margin: 0 auto;
                position: relative;
                top: 70%;
                transform: translateY(-70%);
            }

            .head-text {
                width: 100%;
                margin-left: 0;
                padding: 10px;
                height: 160px;
                margin-top: 20px;
            }

            .head-text-phone {
                display: block;
                background-color: hsl(219, 32%, 10%);
                margin-top: 20px;
            }

            .name {
                margin: 0 auto;
                column-gap: 20px;
                width: 100%;
            }

            .lbl {
                display: none;
            }

            .ayarlar {
                display: none;
            }

            .ayarlar-phone {
                display: block;
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
                        <h1 class="baslikkk">HOŞGELDİN
                            <asp:Label ID="LabelHosgeldin" runat="server" Text="Label"></asp:Label>
                        </h1>
                    </div>

                    <div class="hakkimda-content">
                        <div class="profile-head">
                            <div class="profile-logo">
                                <asp:Image ID="Image1" CssClass="profile-img" runat="server" />
                            </div>
                            <div class="head-text">
                                <div class="head-title">
                                    <div class="name">
                                        <asp:Label ID="LabelKullaniciAdi" CssClass="kadi" runat="server" Text="Label"></asp:Label>
                                        <asp:Label ID="LabelKullaniciID" CssClass="id" runat="server" Text="Label"></asp:Label>
                                    </div>
                                    <div class="profilesetting-phone-logout">
                                        <asp:Button ID="Button1" runat="server" CssClass="yazi" Text="ÇIKIŞ " OnClick="Button1_Click" />
                                        <ion-icon name="exit-outline"></ion-icon>
                                    </div>
                                    <div class="ayarlar">
                                        <div class="contt">
                                            <asp:Button ID="ButtonProfileSettings" CssClass="profilesetting" runat="server" Text="PROFİLİ DÜZENLE " OnClick="ButtonProfileSettings_Click" />
                                            <ion-icon name="settings-outline"></ion-icon>
                                        </div>
                                        <div class="contt2">
                                            <asp:Button ID="ButtonCikis" CssClass="profilesetting" runat="server" Text="ÇIKIŞ " OnClick="ButtonCikis_Click1" />
                                            <ion-icon name="exit-outline"></ion-icon>
                                        </div>
                                    </div>

                                </div>
                                <div class="head-bio">
                                    <div class="ayarlar-phone">
                                        <div class="profilesetting-phone">

                                            <asp:Button ID="ButtonProfileSettingPhone" CssClass="yazi" runat="server" Text="PROFİLİ DÜZENLE " OnClick="ButtonProfileSettingPhone_Click" />
                                            <ion-icon name="settings-outline"></ion-icon>
                                        </div>

                                    </div>
                                    <asp:Label CssClass="lbl" ID="LabelBiografi" runat="server" Text="Label"></asp:Label>

                                </div>
                            </div>
                                                         <div class="head-text-phone">
                                <div class="head-title">
                                    <div class="name">
                                        HAKKIMDA
                                    </div>

                                </div>
                                <div class="head-bio">
                                    <asp:Label ID="LabelBiografiPhone" runat="server" Text="Label"></asp:Label>
                                </div>
                            </div>
                        </div>
                        <div class="favoriler">
                            <div class="favoriler-title">
                                <h1>Favorilerim</h1>
                            </div>
                            <div class="movies-grid2">
                                <!--FiLM 1-->
                                <div class="movie-card">
                                    <div class="card-head">
                                        <img src="./assets/images/movies/endgame.jpg" alt="" class="card-img">
                                        <div class="card-overlay">
                                            <div class="rating">
                                                <ion-icon name="star-outline"></ion-icon>
                                                <span>6.4</span>
                                            </div>
                                            <div class="play">
                                                <ion-icon name="play-circle-outline"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="sol">
                                            <img src="assets/images/adventure.jpg" alt="">
                                        </div>
                                        <div class="sag">
                                            <p class="card-title">Red Notice</p>
                                            <div class="card-info">
                                                <span class="genre">Action</span>
                                                <span class="year">21/07/2023</span>
                                            </div>
                                            <div class="uploader-profile">
                                                <span>Mustafa TAŞAL</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!---->
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="../js/main.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</asp:Content>

