import data from "../resources/uxantimat_repo.json" assert { type: 'json' };

function createElement(element) {
    const tagsList = element.tag.split(",").map(tag => tag.trim());
    const li = document.createElement("li");
    li.className = "content-box " + element.category.toLowerCase() + " " + tagsList.map(x => "tag_"+x.trim().replace(" ", "_")).join(" ");
    const introBox = document.createElement("div");
    introBox.className = "intro-box";
    const category = document.createElement("div");
    category.className = "category " + element.category.toLowerCase() + "-category";
    category.innerHTML = element.category;
    const number = document.createElement("p");
    number.className = "number";
    number.innerHTML = element.id;
    introBox.appendChild(category);
    introBox.appendChild(number);
    li.appendChild(introBox);
    const titleBox = document.createElement("h1");
    titleBox.className = "title-box";
    const link = document.createElement("a");
    link.className = "content-link";
    link.href = element.link;
    link.title = "Titolo link";
    link.target = "_blank";
    link.innerHTML = element.title;
    titleBox.appendChild(link);
    li.appendChild(titleBox);
    const textBox = document.createElement("p");
    textBox.className = "text-box";
    textBox.innerHTML = element.description;
    li.appendChild(textBox);
    const footerBox = document.createElement("div");
    footerBox.className = "footer-box";
    if(element.author) {
        const suggest = document.createElement("p");
        suggest.className = "suggest";
        suggest.innerHTML = "Suggerito da ";
        const suggestLink = document.createElement("a");
        suggestLink.className = "suggest-link";
        suggestLink.href = element.author_link;
        suggestLink.title = "Suggerito da";
        suggestLink.target = "_blank";
        suggestLink.innerHTML = element.author;
        suggest.appendChild(suggestLink);
        footerBox.appendChild(suggest);
    }
    const tags = document.createElement("p");
    tags.className = "tag-line";
    tagsList.forEach(tagString => {
        const tag = document.createElement("a");
        tag.className = "tag";
        tag.title = tagString;
        tag.innerHTML = tagString+" ";
        tags.appendChild(tag);
    });
    footerBox.appendChild(tags);
    li.appendChild(footerBox);
    return li;
}

function showData() {
    const container = document.getElementsByClassName("contents-grid")[0];
    container.innerHTML = "";

    data.forEach(element => {
        container.appendChild(createElement(element));
    });
}

showData();

const $grid = $('.contents-grid').isotope({
    itemSelector: '.content-box',
    layoutMode: 'fitRows',
});

$('.filters').on( 'click', 'a', function() {
    const filterValue = $(this).attr('data-filter');
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#search').val("");
    $grid.isotope({ filter: filterValue });
});
$('.tag').on( 'click', function() {
    const filterValue = $(this).text().trim().replace(" ", "_");
    $('.selected').removeClass('selected');
    $('.all').addClass('selected');
    $('#search').val("");
    $grid.isotope({ filter: ".tag_"+filterValue });
});
$('#search').on( 'keyup', function() {
    const value = $('#search').val();
    $('.selected').removeClass('selected');
    $('.all').addClass('selected');
    $grid.isotope({
        filter: function() {
            const text = $(this).text();
            return text.includes(value);
        }
    })
});
