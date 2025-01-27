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
  const width = 800;
  const height = 600;

  // Данные узлов (слова) и связей (ребра)
  const nodes = [
      { id: "Computational Linguistics", group: 0, weight: 30 },
      { id: "Natural language processing", group: 1, weight: 25 },
      { id: "Machine translation", group: 1, weight: 20 },
      { id: "Dialog system development", group: 1, weight: 22 },
      { id: "Speech technologies", group: 1, weight: 18 },
      { id: "Information retrieval", group: 2, weight: 20 },
      { id: "Knowledge graphs", group: 2, weight: 22 },
      { id: "Summarization", group: 3, weight: 20 },
      { id: "Topic modeling", group: 3, weight: 18 },
      { id: "Corpus linguistics", group: 4, weight: 12 }
  ];

  const links = [
      { source: "Computational Linguistics", target: "Natural language processing" },
      { source: "Computational Linguistics", target: "Machine translation" },
      { source: "Computational Linguistics", target: "Dialog system development" },
      { source: "Natural language processing", target: "Speech technologies" },
      { source: "Knowledge graphs", target: "Information retrieval" },
      { source: "Summarization", target: "Topic modeling" },
      { source: "Computational Linguistics", target: "Corpus linguistics" }
  ];

  // Создаем SVG
  const svg = d3
      .select("#connected-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#3b3b3b");

  // Симуляция
  const simulation = d3
      .forceSimulation(nodes)
      .force(
          "link",
          d3.forceLink(links)
              .id((d) => d.id)
              .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-300)) // Отталкивание
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
          "attractToCenter",
          d3.forceRadial(200, width / 2, height / 2).strength((d) => {
              // Увеличиваем силу притяжения к центру для узлов с меньшей связностью
              return d.id === "Information retrieval" ||
                  d.id === "Knowledge graphs" ||
                  d.id === "Summarization" ||
                  d.id === "Topic modeling" ||
                  d.id === "Corpus linguistics"
                  ? 0.5
                  : 0;
          })
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
          const colors = ["#1f77b4", "#2ca02c", "#ff7f0e", "#d62728", "#9467bd"];
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
          return `M${d.source.x},${d.source.y}C${(d.source.x + d.target.x) / 2},${d.source.y} ${
              (d.source.x + d.target.x) / 2
          },${d.target.y} ${d.target.x},${d.target.y}`;
      });

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      text
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y - d.weight / 2 - 5); // Текст над узлами
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

