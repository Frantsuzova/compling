$(document).ready(function() {
  // Функция для установки цветового класса
  function setColorClass(slick, slideIndex) {
      var sliderRoot = $('#landing-slideshow').closest('.upper-landing__slideshow');
      var colorClass = $(slick.$slides[slideIndex]).attr('data-color-class');
      sliderRoot.removeClass('compling zakharov textmining llm').addClass(colorClass);
  }

  // Инициализация Slick Slider
  $('#landing-slideshow').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: '.slideshow-dots',
      appendArrows: '.slideshow-arrows',
      prevArrow: '#ul-prev',
      nextArrow: '#ul-next',
      fade: true,
      initialSlide: 0 // Устанавливаем первый слайд активным при загрузке
  });

  // Начальная установка цвета и изменение при переключении слайдов
  $('#landing-slideshow').on('init', function(event, slick) {
      setColorClass(slick, slick.currentSlide);
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      setColorClass(slick, nextSlide);
  });

  
});


document.addEventListener("DOMContentLoaded", function () {
    const width = 850;
    const height = 400;
 

  // Данные узлов (слова) и связей (ребра)
  const nodes = [
      { id: "Computational Linguistics", group: 0, weight: 30 },
      { id: "Corpus Linguistics", group: 1, weight: 25 },
      { id: "NLP", group: 2, weight: 20 },
      { id: "Text Embeddings", group: 2, weight: 15 },
      { id: "Natural language processing", group: 2, weight: 12 },
      { id: "Machine translation", group: 2, weight: 10 },
      { id: "Dialog system development", group: 2, weight: 10 },
      { id: "Speech technologies", group: 2, weight: 10 },
      { id: "Morphological tagging", group: 0, weight: 8 },
      { id: "Anaphora resolution", group: 0, weight: 8 },
      { id: "Computational semantics", group: 0, weight: 8 },
      { id: "Computational lexicography", group: 0, weight: 8 },
      { id: "Corpora development", group: 1, weight: 10 },
      { id: "Lexical databases", group: 1, weight: 10 },
      { id: "Knowledge graphs", group: 1, weight: 10 },
      { id: "Formal ontologies", group: 1, weight: 10 },
      { id: "Topic modeling", group: 2, weight: 8 },
      { id: "Social network analysis", group: 2, weight: 8 },
      { id: "Sentiment analysis", group: 2, weight: 8 },
  ];

  const links = [
      { source: "Computational Linguistics", target: "Corpus Linguistics" },
      { source: "Computational Linguistics", target: "Morphological tagging" },
      { source: "Computational Linguistics", target: "Anaphora resolution" },
      { source: "Computational Linguistics", target: "Computational semantics" },
      { source: "Computational Linguistics", target: "Computational lexicography" },
      { source: "Corpus Linguistics", target: "Corpora development" },
      { source: "Corpus Linguistics", target: "Lexical databases" },
      { source: "Corpus Linguistics", target: "Knowledge graphs" },
      { source: "Corpus Linguistics", target: "Formal ontologies" },
      { source: "NLP", target: "Text Embeddings" },
      { source: "NLP", target: "Natural language processing" },
      { source: "NLP", target: "Machine translation" },
      { source: "NLP", target: "Dialog system development" },
      { source: "NLP", target: "Speech technologies" },
      { source: "Text Embeddings", target: "Topic modeling" },
      { source: "Text Embeddings", target: "Social network analysis" },
      { source: "Text Embeddings", target: "Sentiment analysis" },
  ];

  // Создаем SVG
  const svg = d3
      .select("#connected-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#3b3b3b")
      .style("overflow", "hidden");

  // Симуляция
  const simulation = d3
      .forceSimulation(nodes)
      .force(
          "link",d3.forceLink(links)
.id((d) => d.id)
.distance(90)
)
.force("charge", d3.forceManyBody().strength(-100)) // Слабое отталкивание
.force("center", d3.forceCenter(width / 3, height / 2.5)) // Центральное притяжение
.force(
"attractToNLP",
d3.forceRadial(200, width / 2, height / 4).strength((d) => {
// Притяжение Text Embeddings ближе к NLP
return d.id === "Text Embeddings" ? 1 : 0;
})
)
.force(
"edgeAvoidance",
d3.forceCollide((d) => d.weight / 2 + 20).strength(0.7) // Уменьшение пересечений
);

// Линии (ребра)
const link = svg
.append("g")
.selectAll("path")
.data(links)
.enter()
.append("path")
.attr("stroke-width", 2)
.attr("fill", "none")
.attr("stroke", "#999");

// Узлы (слова)
const node = svg
.append("g")
.selectAll("circle")
.data(nodes)
.enter()
.append("circle")
.attr("r", (d) => d.weight / 2) // Размер узлов
.attr("fill", (d) => {
const colors = ["#1f77b4", "#2ca02c", "#ff7f0e", "#d62728"];
return colors[d.group % colors.length];
})
.call(
d3
.drag()
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended)
);

// Текст для узлов
const text = svg
.append("g")
.selectAll("text")
.data(nodes)
.enter()
.append("text")
.text((d) => d.id)
.attr("font-size", "12px")
.attr("fill", "#fff")
.attr("text-anchor", "middle");

// Обновление позиции
simulation.on("tick", () => {
  link.attr("d", (d) => {
    return `M${Math.max(0, d.source.x)},${Math.max(0, d.source.y)}
            C${Math.max(0, (d.source.x + d.target.x) / 2)},${Math.max(0, d.source.y)} 
            ${Math.max(0, (d.source.x + d.target.x) / 2)},${Math.max(0, d.target.y)} 
            ${Math.max(0, d.target.x)},${Math.max(0, d.target.y)}`;
  });

  node.attr("cx", (d) => Math.max(10, Math.min(width - 10, d.x)))
      .attr("cy", (d) => Math.max(10, Math.min(height - 10, d.y)));

  text.attr("x", (d) => Math.max(10, Math.min(width - 10, d.x)))
      .attr("y", (d) => Math.max(10, Math.min(height - 10, d.y - d.weight / 2 - 5)));
});

// Функции перетаскивания
function dragstarted(event, d) {
if (!event.active) simulation.alphaTarget(0.3).restart();
d.fx = d.x;
d.fy = d.y;
}

function dragged(event, d) {
d.fx = event.x;
d.fy = event.y;
}

function dragended(event, d) {
if (!event.active) simulation.alphaTarget(0);
d.fx = null;
d.fy = null;
}
});


function submitForm(event) {
    event.preventDefault(); // Прекращаем стандартное поведение формы (перенаправление)

    const form = event.target;
    const formData = new FormData(form);

    // Отправляем данные в Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            // Если отправка успешна, показываем попап и очищаем форму
            showPopup();
            clearForm(form); // Очищаем форму
        } else {
            alert("Ошибка при отправке сообщения.");
        }
    })
    .catch(error => {
        alert("Ошибка при отправке сообщения.");
    });
}

// Функция для отображения попапа
function showPopup() {
    const popup = document.getElementById("popup-success");
    popup.style.display = "block";
}

// Функция для закрытия попапа
function closePopup() {
    const popup = document.getElementById("popup-success");
    popup.style.display = "none";
}

// Функция для очистки данных формы
function clearForm(form) {
    form.reset(); // Метод reset() очищает все поля формы
}

