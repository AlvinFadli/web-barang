const inputBtn = document.getElementById("inputBtn");
const clearBtn = document.getElementById("clearBtn");

renderData();
function inputFunc() {
  let id, nama, stok, jenis, harga;
  id = document.getElementById("id");
  nama = document.getElementById("nama");
  stok = document.getElementById("stok");
  harga = document.getElementById("harga");
  jenis = document.querySelectorAll('input[name="jenisBarang"]');

  let temp = new Array();

  temp = JSON.parse(localStorage.getItem("temp"))
    ? JSON.parse(localStorage.getItem("temp"))
    : [];
  let selectedJenis;
  for (const index of jenis) {
    if (index.checked) {
      selectedJenis = index.value;
      break;
    }
  }
  if (
    (id.value == "", nama.value == "", stok.value == "", selectedJenis == null)
  ) {
    alert("Mohon isi data dengan lengkap");
    return;
  } else if (harga.value == "") {
    alert("Mohon isi data dengan lengkap");
    return;
  } else {
    alert(
      `Input Data
         Id (${id.value})
         Nama (${nama.value})
         Stok (${stok.value})
         Jenis (${selectedJenis})
         Harga (${harga.value})
         Klik OK`
    );

    temp.push({
      id: id.value,
      nama: nama.value,
      stok: stok.value,
      jenis: selectedJenis,
      harga: harga.value,
    });

    localStorage.setItem("temp", JSON.stringify(temp));

    clearFunc();
    let test = localStorage.getItem("temp");
  }

  renderData();
}
function clearFunc() {
  id.value = "";
  nama.value = "";
  stok.value = "";
  harga.value = "";
  var radios = document.getElementsByTagName("input");
  for (i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
}

function renderData() {
  document.getElementById("dataBarang").innerHTML = "";

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById("dataBarang").appendChild(table);

  let temp = new Array();
  temp = JSON.parse(localStorage.getItem("temp"))
    ? JSON.parse(localStorage.getItem("temp"))
    : [];
  if (temp) {
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Id";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Nama Barang";
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Stok";
    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Jenis";
    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Harga";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);

    for (let i = 0; i < temp.length; i++) {
      let row_2 = document.createElement("tr");
      let row_2_data_1 = document.createElement("td");
      row_2_data_1.innerHTML = `${temp[i].id}`;
      let row_2_data_2 = document.createElement("td");
      row_2_data_2.innerHTML = `${temp[i].nama}`;
      let row_2_data_3 = document.createElement("td");
      row_2_data_3.innerHTML = `${temp[i].stok}`;
      let row_2_data_4 = document.createElement("td");
      row_2_data_4.innerHTML = `${temp[i].jenis}`;
      let row_2_data_5 = document.createElement("td");
      row_2_data_5.innerHTML = `${temp[i].harga}`;

      row_2.appendChild(row_2_data_1);
      row_2.appendChild(row_2_data_2);
      row_2.appendChild(row_2_data_3);
      row_2.appendChild(row_2_data_4);
      row_2.appendChild(row_2_data_5);
      tbody.appendChild(row_2);
    }
  }
}
function deleteAll() {
  let confir = confirm("Anda yakin ingin menghapus semua data barang?");
  if (confir) {
    localStorage.clear();
    renderData();
  }
}
