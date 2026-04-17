<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="kategoriler.aspx.cs" Inherits="assets_pages_kategoriler" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>TEKNOFİLM - KATEGORİLER
    </title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <main>
        <section class="movies">
            <div class="filter-bar">
                &nbsp;
            </div>
        </section>
        <section class="category" id="category">
            <h2 class="section-heading">Kategoriler</h2>
            <div class="category-grid">
                <!--KATEGORİ-->
                <div class="category-card">
                    <img src="../images/action.jpg" class="card-img">
                    <div class="name">Action</div>
                    <div class="total">100</div>
                </div>
                <!---->
            </div>
        </section>
    </main>
    <script src="../js/main.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</asp:Content>

