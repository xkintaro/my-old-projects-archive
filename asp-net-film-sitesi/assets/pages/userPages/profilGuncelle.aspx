<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master"
AutoEventWireup="true" CodeFile="profilGuncelle.aspx.cs"
Inherits="assets_pages_userPages_profilGuncelle" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
  <title>TEKNOFİLM - PROFİL GÜNCELLE</title>
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

    .profile-guncelle {
      display: flex;
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

    .bio-guncelle {
      background-color: hsl(219, 32%, 10%);
      margin-left: 10px;
      width: 100%;
      border-radius: 15px;
      padding: 20px;
    }

    .bio-duzenle {
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 100%;
      min-height: 120px;
      padding: 20px;
      font-size: 22px;
      color: #fff;
      border-radius: 15px;
    }

    .others-guncelle {
      background-color: hsl(219, 32%, 10%);
      min-height: 100px;
      width: 98%;
      margin-top: 20px;
      border-radius: 15px;
      padding: 20px;
    }

    .btn {
      color: #fff;
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 200px;
      height: 40px;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
    }

    .btn1 {
      background-color: red;
      border-radius: 10px;
      margin-left: 10px;
      padding: 5px 15px;
      cursor: pointer;
    }

    .btn2 {
      background-color: green;
      margin-left: 10px;
      padding: 5px 15px;
      cursor: pointer;
      border-radius: 10px;
    }

    .btnnn {
      color: #fff;
    }

    .profil-yukle {
      background-color: hsl(219, 32%, 10%);
      width: 200px;
      height: 200px;
      margin-left: 10px;
      padding: 50px 10px;
      border-radius: 15px;
    }

    .file {
      word-wrap: break-word;
      font-size: 12px;
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

    .txtbxs {
      background-color: hsla(218, 39%, 14%, 0.8);
      width: 80%;
      border-radius: 10px;
      padding-left: 10px;
      margin: 10px 0;
      height: 35px;
      color: gray;
      user-select: none;
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

    .bio-guncelle-phone {
      background-color: hsl(219, 32%, 10%);
      margin: 10px 0;
      width: 100%;
      border-radius: 15px;
      padding: 20px;
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
  runat="Server"
>
  <main>
    <section class="movies">
      <div class="filter-bar">&nbsp;</div>
      <div class="movies-grid">
        <div class="hakkimda">
          <div class="hakkimda-title">
            <h1>AYARLAR</h1>
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
              <div class="btn2">
                <asp:Button
                  CssClass="btnnn"
                  ID="ButtonKAYDET"
                  runat="server"
                  Text="KAYDET"
                  OnClick="ButtonKAYDET_Click"
                />
              </div>
            </div>
          </div>
          <div class="guncelle">
            <div class="profile-guncelle">
              <div class="ilk">
                <div class="resim-guncelle">
                  <asp:Image CssClass="resim" ID="Image1" runat="server" />
                </div>
                <div class="profil-yukle">
                  <p>profil resmi seçiniz.</p>
                  <br />
                  <asp:FileUpload
                    ID="FileUpload1"
                    CssClass="file"
                    runat="server"
                  />
                  <br />
                  <br />
                  <p>dosya seçtikten sonra kaydet e basınız</p>
                </div>
              </div>
              <div class="son">
                <div class="bio-guncelle">
                  <div class="bio-title">
                    <h3>HAKKIMDA</h3>
                  </div>
                  <div class="bio-text">
                    <asp:TextBox
                      CssClass="bio-duzenle"
                      TextMode="MultiLine"
                      ID="TextBox1"
                      runat="server"
                    ></asp:TextBox
                    ><asp:Label ID="Label1" runat="server" Text=""></asp:Label>
                  </div>
                </div>
              </div>
            </div>

            <div class="others-guncelle">
              <label>Kullanici Adi:</label><br />
              <asp:TextBox
                ID="TextBoxKadi"
                CssClass="txtbx"
                runat="server"
              ></asp:TextBox
              ><br /> <label>E-posta:</label><br />
              <asp:TextBox
                ID="TextBoxEposta"
                CssClass="txtbxs"
                runat="server"
              ></asp:TextBox
              ><asp:Button
                CssClass="btns"
                ID="Button1"
                runat="server"
                Text="E-POSTA DEĞİŞTİR"
                OnClick="Button1_Click"
              /><br /> <label>Şİfre:</label><br />
              <asp:TextBox
                ID="TextBoxSifre"
                CssClass="txtbxs"
                runat="server"
              ></asp:TextBox
              ><asp:Button
                CssClass="btns"
                ID="Button2"
                runat="server"
                Text="ŞİFRE DEĞİŞTİR"
                OnClick="Button2_Click"
              /><br />
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
