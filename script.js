// Gán sự kiện onchange cho các trường input
document.getElementById("StartTimeTextBox").addEventListener("change", calculate);
document.getElementById("EndTimeTextBox").addEventListener("change", calculate);
document.getElementById("CheckBox1").addEventListener("change", calculate);
document.getElementById("CheckBox2").addEventListener("change", calculate);

// Hàm tính toán
function calculate() {
  //Lấy giá trị từ TextBox cho thời gian bắt đầu và kết thúc
  var startTime = new Date("2000-01-01T" + document.getElementById("StartTimeTextBox").value + ":00Z");
  var endTime = new Date("2000-01-01T" + document.getElementById("EndTimeTextBox").value + ":00Z");

  //Kiểm tra nếu thời gian kết thúc nhỏ hơn thời gian bắt đầu thì cộng 1 ngày cho thời gian kết thúc
  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  //Tính số giờ công dựa trên thời gian bắt đầu và kết thúc
  var workingHours = (endTime - startTime) / (1000 * 60 * 60);
  workingHours = Math.round(workingHours * 100) / 100;

  //Tính số giờ làm việc thực tế
  var actualHours = workingHours;

  if (document.getElementById("CheckBox1").checked && document.getElementById("CheckBox2").checked) {
    actualHours = actualHours - 2.5;
  } else if (document.getElementById("CheckBox1").checked) {
    actualHours = actualHours - 1.5;
  } else if (document.getElementById("CheckBox2").checked) {
    actualHours = actualHours - 1;
  }

  //Tính số giờ làm việc tăng ca
  var overtimeHours = 0;
  if (actualHours > 8) {
    overtimeHours = actualHours - 8;
  }

  //Tính số giờ làm việc ban đêm
  var nightShiftHours = 0;
  var endTimeNightShift = new Date("2000-01-01T22:00:00Z");
  if (endTime > endTimeNightShift) {
    nightShiftHours = (endTime - endTimeNightShift) / (1000 * 60 * 60);
    nightShiftHours = Math.round(nightShiftHours * 100) / 100;
  }

  //Hiển thị kết quả trên TextBox
  document.getElementById("WorkingHoursLabel").value = actualHours;
  document.getElementById("OvertimeHoursLabel").value = overtimeHours;
  document.getElementById("NightShiftLabel").value = nightShiftHours;
}
