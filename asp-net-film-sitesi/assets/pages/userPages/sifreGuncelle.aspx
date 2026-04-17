<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master"
AutoEventWireup="true" CodeFile="sifreGuncelle.aspx.cs"
Inherits="assets_pages_userPages_sifreGuncelle" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  <title>TEKNOFİLM - ŞİFRE GUNCELLE</title>
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
      padding: 20px 0;
      display: flex;
    }

    .hakkimda-title h1 {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .guncelle {
      padding: 10px 20px;
    }

    .ilk {
      display: flex;
    }

    .son {
      display: flex;
      width: 100%;
    }

    .resim {
      height: 200px;
      width: 200px;
      border-radius: 15px;
    }

    .resim-guncelle {
      height: 200px;
      width: 200px;
      background-color: hsl(219, 32%, 10%);
      border-radius: 15px;
    }

    .bio-title {
      margin-bottom: 10px;
      display: flex;
    }

    .btnlar {
      display: flex;
      position: relative;
      left: 60%;
      transform: translateX(-60%);
    }

    .btns {
      color: #fff;
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 200px;
      height: 40px;
      text-align: center;
      margin-left: 5px;
      border-radius: 15px;
      cursor: pointer;
    }

    .btn1 {
      background-color: red;
      border-radius: 10px;
      margin-left: 10px;
      padding: 5px 15px;
      color: #fff;
      cursor: pointer;
    }

    .btn2 {
      color: #fff;
      background-color: green;
      margin-left: 10px;
      padding: 5px 15px;
      cursor: pointer;
      border-radius: 10px;
    }

    .profile-guncelle {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      padding: 20px;
      border-radius: 20px;
      background-color: hsl(219, 32%, 10%);
    }

    p {
      margin-bottom: 30px;
    }

    .lblb {
      color: lightcoral;
      margin-bottom: 30px;
    }

    .txtbx {
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 100%;
      border-radius: 10px;
      padding-left: 10px;
      margin: 10px 0;
      height: 35px;
      color: #fff;
    }

    .btn {
      color: #fff;
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 50%;
      height: 40px;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
    }
    .kod {
      background-color: hsl(219, 32%, 10%);
      width: 50%;
      padding: 20px;
      margin-top: 10px;
      height: 60px;
      border-radius: 20px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    @media only screen and (max-width: 900px) {
      .profile-guncelle {
        display: block;
      }

      .resim-guncelle {
        margin: 0 10px;
      }

      .resim {
        width: 100%;
      }

      .profil-yukle {
        width: 67%;
      }

      .bio-guncelle {
        margin-left: 0;
        margin-top: 10px;
      }

      .txtbxs {
        width: 100%;
      }

      .btns {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media only screen and (max-width: 650px) {
      .hakkimda-title h1 {
        position: relative;
        left: 10px;
        transform: translateX(0);
        font-size: 20px;
      }

      .btnlar {
        display: flex;
        position: relative;
        left: 28%;
        transform: translateX(-30%);
        font-size: 10px;
      }

      .resim-guncelle {
        margin: 0 10px;
        width: 50%;
      }

      .resim {
        width: 100%;
      }

      .profil-yukle {
        width: 50%;
      }
    }

    @media only screen and (max-width: 475px) {
      .resim-guncelle {
        margin: 0 10px;
        width: 150px;
        height: 100px;
      }

      .resim {
        width: 100%;
        height: 100px;
      }

      .profil-yukle {
        padding: 10px;
        font-size: 10px;
        width: 55%;
        height: 100px;
      }
    }
  </style>
</asp:Content>
<asp:Content
  ID="Content2"
  ContentPlaceHolderID="ContentPlaceHolder1"
  Runat="Server"
>
  <main>
    <section class="movies">
      <div class="filter-bar">&nbsp;</div>
      <div class="movies-grid">
        <div class="hakkimda">
          <div class="hakkimda-title">
            <h1>ŞİFRE</h1>
            <div class="btnlar">
              <div class="btn1">
                <asp:Button
                  CssClass="btnnn"
                  ID="ButtonİPTAL"
                  runat="server"
                  Text="İPTAL"
                  OnClick="ButtonİPTAL_Click"
                />
              </div>
            </div>
          </div>
          <div class="guncelle">
            <div class="profile-guncelle">
              <p>
                Lütfen
                <asp:Label
                  ID="Label1"
                  CssClass="lblb"
                  runat="server"
                  Text="Label"
                ></asp:Label>
                E-posta adresine gönderilen kodu giriniz.
              </p>
              <label>Mevcut Şİfre:</label><br />
              <asp:TextBox
                ID="TextBox1"
                CssClass="txtbx"
                runat="server"
              ></asp:TextBox
              ><br />
              <asp:TextBox
                ID="TextBox2"
                CssClass="txtbx"
                placeholder="Doğrulama Kodunu Giriniz."
                runat="server"
              ></asp:TextBox
              ><br /><br />
              <asp:Button
                ID="Button1"
                CssClass="btn"
                runat="server"
                Text="KAYDET"
                OnClick="Button1_Click"
              /><br /><br />
              <asp:Label ID="Label2" runat="server" Text=""></asp:Label>
            </div>
          </div>
          <div class="kod">
            <asp:Label ID="Label3" runat="server" Text="Label"></asp:Label>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="../../js/main.js"></script>
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>
</asp:Content>
