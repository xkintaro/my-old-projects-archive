<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master"
AutoEventWireup="true" CodeFile="kayit.aspx.cs"
Inherits="assets_pages_userPages_kayit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
  <title>TEKNOFİLM - KAYIT</title>
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
      color: #fff;
      text-align: center;
      position: relative;
      cursor: pointer;
      left: 50%;
      margin-bottom: 20px;
      transform: translateX(-50%);
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

    .txtbx:focus {
      border: 1px solid #2566ff;
    }

    .btnn:hover {
      border: 1px solid #2566ff;
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
<asp:Content
  ID="Content2"
  ContentPlaceHolderID="ContentPlaceHolder1"
  runat="Server"
>
  <main>
    <section class="movies">
      <div class="filter-bar">&nbsp;</div>
      <div class="movies-grid">
        <div class="hakkimda">
          <div class="hakkimda-title">
            <h1>KULLANICI KAYIT</h1>
          </div>
          <div class="hakkimda-content">
            <div class="giris-form">
              <div class="giris-form-controller">
                <asp:TextBox
                  ID="TextBoxKullaniciAdi"
                  runat="server"
                  CssClass="txtbx"
                  placeholder="Kullanıcı Adı"
                ></asp:TextBox>
              </div>
              <div class="giris-form-controller">
                <asp:TextBox
                  ID="TextBoxEposta"
                  runat="server"
                  CssClass="txtbx"
                  placeholder="E-Posta"
                ></asp:TextBox>
              </div>
              <div class="giris-form-controller">
                <asp:TextBox
                  ID="TextBoxSifre"
                  runat="server"
                  CssClass="txtbx"
                  placeholder="Şifre"
                ></asp:TextBox>
              </div>
              <div class="giris-form-controller">
                <asp:TextBox
                  ID="TextBoxSifreTekrar"
                  runat="server"
                  CssClass="txtbx"
                  placeholder="Şifre Tekrar"
                ></asp:TextBox>
              </div>
              <div class="giris-form-controller">
                <asp:Button
                  ID="ButtonKayit"
                  runat="server"
                  CssClass="btnn"
                  Text="KAYIT"
                  OnClick="ButtonKayit_Click"
                />
              </div>
              <div class="giris-form-controller">
                <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
              </div>
            </div>
            <div class="kayit-ol">
              <div class="txt-cont">
                <p>Zaten Bir Hesabınız Var mı ?</p>
              </div>
              <div class="kyt-cont">
                <a href="giris.aspx" class="btn-kayit">GİRİŞ YAP</a>
              </div>
            </div>
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
