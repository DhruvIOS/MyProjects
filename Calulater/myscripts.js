document.querySelectorAll("input").forEach((occurence) => {
  let id = occurence.getAttribute("id");
  let number = occurence.getAttribute("value");

  let numbe2 = occurence.getAttribute("value");


  occurence.addEventListener("click", function () {
    // console.log("A button with ID " + id + " was clicked!");

    document.getElementById("text").innerHTML = number;


    if(id == 'equal'){

      let sum = number+numbe2

      console.log(sum)

    }
  });
});
