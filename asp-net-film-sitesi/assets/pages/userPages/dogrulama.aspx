<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master"
AutoEventWireup="true" CodeFile="dogrulama.aspx.cs"
Inherits="assets_pages_userPages_dogrulama" %>

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
    }

    .dogrulatxt span {
      color: lightcoral;
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
            <h1>E-POSTA DOĞRULAMA</h1>
          </div>
          <div class="hakkimda-content">
            <div class="giris-form">
              <div class="giris-form-controller">
                <p class="dogrulatxt">
                  Lütfen
                  <span>
                    <asp:Label
                      ID="LabelEposta"
                      runat="server"
                      Text="Label"
                    ></asp:Label> </span
                  >Eposta adresine gönderilen kodu giriniz.
                </p>
              </div>
              <div class="giris-form-controller">
                <asp:TextBox
                  ID="TextBoxDogrulamaKodu"
                  runat="server"
                  CssClass="txtbx"
                  placeholder="Doğrulama Kodu"
                ></asp:TextBox>
                <asp:Button
                  ID="ButtonYenidenKodAl"
                  CssClass="kodal-btn"
                  runat="server"
                  Text="KOD AL"
                  OnClick="ButtonYenidenKodAl_Click"
                />
              </div>
              <div class="giris-form-controller">
                <asp:Button
                  ID="ButtonDogrula"
                  CssClass="btnn"
                  runat="server"
                  Text="DOĞRULA"
                  OnClick="ButtonDogrula_Click"
                />
              </div>
              <div class="giris-form-controller">
                <asp:Label
                  ID="LabelDurum"
                  runat="server"
                  Text="Label"
                ></asp:Label>
              </div>
            </div>
            <div class="kayit-ol">
              <div class="txt-cont">
                <span>Doğrulama Kodunuz: </span>
                <span>
                  <asp:Label
                    ID="LabelDogrulamaKodu"
                    runat="server"
                    Text="Label"
                  ></asp:Label>
                </span>
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
