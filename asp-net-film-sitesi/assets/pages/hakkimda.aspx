<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master"
AutoEventWireup="true" CodeFile="hakkimda.aspx.cs"
Inherits="assets_pages_hakkimda" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
  <title>TEKNOFİLM - HAKKIMDA</title>
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
      display: flex;
      justify-content: space-between;
      padding: 10px 2%;
    }

    .hakkimda-sol,
    .hakkimda-sag {
      background-color: hsl(219, 32%, 10%);
      width: 49%;
      min-height: 500px;
      border-radius: 10px;
      padding: 30px;
    }

    .hakkimda-sol h2 {
      margin-top: 5px;
      margin-bottom: 20px;
    }

    .hakkimda-form {
      padding: 10px;
      margin-top: 20px;
    }

    .hakkimda-sag h2 {
      margin-left: 12px;
    }

    .hakkimda-form-controller {
      display: flex;
      margin: 10px 0;
    }

    .txtbx {
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 100%;
      border-radius: 10px;
      padding-left: 10px;
      height: 35px;
      color: #fff;
    }

    .txtbx-multi {
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 100%;
      border-radius: 10px;
      padding-top: 10px;
      padding-left: 10px;
      height: 180px;
      border: none;
      font-size: 22px;
      color: #fff;
      resize: none;
    }

    .btnn {
      background-color: hsla(218, 39%, 14%, 0.8);
      min-width: 150px;
      border-radius: 10px;
      height: 40px;
      margin-bottom: 20px;
      color: #fff;
      text-align: center;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .lbl {
    }
    @media only screen and (max-width: 800px) {
      .hakkimda-content {
        display: block;
      }

      .hakkimda-sol {
        width: 100%;
        min-height: 200px;
        margin-bottom: 20px;
      }

      .hakkimda-sag {
        width: 100%;
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
            <h1>HAKKIMDA SAYFAM</h1>
          </div>
          <div class="hakkimda-content">
            <div class="hakkimda-sol">
              <h2>Ben kimim ?</h2>
              <p>
                Ben Konya Tekniki ve Mesleki Anadolu Lisesinden, 2706 numaralı
                öğrenci Mustafa TAŞAL. Bilşim bölümünde okuyorum.
              </p>
              <br />
              <p></p>
            </div>
            <div class="hakkimda-sag">
              <h2>Bize Yazın</h2>
              <div class="hakkimda-form">
                <div class="hakkimda-form-controller">
                  <asp:TextBox
                    ID="TextBoxkadi"
                    runat="server"
                    placeholder="Kullanıcı Adı"
                    CssClass="txtbx"
                  ></asp:TextBox>
                </div>
                <div class="hakkimda-form-controller">
                  <asp:TextBox
                    ID="TextBoxMetin"
                    runat="server"
                    TextMode="MultiLine"
                    placeholder="Metin"
                    CssClass="txtbx-multi"
                  ></asp:TextBox>
                </div>
                <div class="hakkimda-form-controller">
                  <asp:Button
                    ID="Button1"
                    runat="server"
                    CssClass="btnn"
                    Text="GÖNDER"
                    OnClick="Button1_Click"
                  />
                </div>
                <div class="hakkimda-form-controller">
                  <asp:Label
                    ID="Label1"
                    runat="server"
                    CssClass="lbl"
                    Text=""
                  ></asp:Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="../js/main.js"></script>
  <script
    type="module"
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
  ></script>
  <script
    nomodule
    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
  ></script>
</asp:Content>
