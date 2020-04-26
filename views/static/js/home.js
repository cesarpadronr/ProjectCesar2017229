$( document ).ready(function() {

    //on page load keep the user list populated------------START
    $.ajax({
        url: "users/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {
            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTable > tbody:last-child').append(getRowHtml(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    //-------------------------------------------------------last

    //submured form to add a user----------------------------beggining
    $("#btnSubmit").click (() => {
        $("#addUserForm").submit();
    });

	$(document).on("submit", '#addUserForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'users/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTable > tbody:last-child').append(getRowHtml(item));
                });
                $('#addUserForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------last
	   
    //on click to delete record----------------------------beggining
    $(document).on("click", ".btn-del-record", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'users/delete',
            data: { id:this.id },
            type: 'POST'
            
        })
        .done((data) => {
            if(data) {
               console.log(data);
               row.remove();
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	
    //------------------------------------------------------last

});

function getRowHtml(item) {
    var thtml = getTD(item._id) 
                + getTD(item.product) 
                + getTD(item.quantity) 
                + getTD(item.price)
                + getDelBtn(item._id);
    thtml = getTR(thtml);
    return thtml;
}
function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}

function getDelBtn(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-record"><span class="fa fa-trash-alt"></span> Delete </button></td>';
}
function editDelBtn(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-record"><span class="fa fa-trash-alt"></span> Edit </button></td>';
}
const buildIDS = (todo)=>{
    return {
        editID : "edit_" + todo._id,
        deleteID : "delete_" + todo._id,
        listItemID : "listItem_" + todo._id,
        todoID : "todo_" + todo._id
    }
}