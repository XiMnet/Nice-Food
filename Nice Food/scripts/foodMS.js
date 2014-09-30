var foodMS = kendo.observable({
    description: "Description",
    isDescriptionShown: false,
    showDescription: function (e) {
        // show the span by setting isDescriptionShown to true
        this.set("isDescriptionShown", true);
    },
    showMessage: function (e) {
        alert(this.get("isDescriptionShown"));
    }
});

function init_foodMS(){
    alert("Food MS Init");
}

//kendo.bind($("#foodMS_add"), viewModel);