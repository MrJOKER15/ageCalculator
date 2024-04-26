function calculateAge() {
    var birthdate = document.getElementById('birthdate').value;
    var result = document.getElementById('result');
    var errorMessage = document.getElementById('error-message');

    if (!birthdate) {
        errorMessage.textContent = 'عذرًا، يرجى إدخال تاريخ ميلادك.';
        result.textContent = '';
        return;
    } else {
        errorMessage.textContent = '';
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0); // إزالة الوقت من تاريخ اليوم لمقارنة التواريخ فقط
    var birthDate = new Date(birthdate);

    if (birthDate > today) {
        errorMessage.textContent = 'تاريخ الميلاد لا يمكن أن يكون في المستقبل.';
        result.textContent = '';
        return;
    }

    if (birthDate.getTime() === today.getTime()) {
        result.innerHTML = '<span style="color: red;">الرجاء إدخال تاريخ غير تاريخ اليوم.</span>';
        return;
    }

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    var months = (today.getMonth() + 12) - birthDate.getMonth() + (12 * (today.getFullYear() - birthDate.getFullYear()));
    if (today.getDate() < birthDate.getDate()) {
        months--;
    }
    months %= 12;

    var diffDays = today.getDate() - birthDate.getDate();
    var days = diffDays < 0 ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() + diffDays : diffDays;

    var resultParts = [];
    if (age > 0) {
        var ageText = age === 1 ? "سنة" : age === 2 ? "سنتين" : age > 2 && age < 11 ? age + " سنوات" : age + " سنة";
        resultParts.push(ageText);
    }
    if (months > 0) {
        var monthsText = months === 1 ? "شهر" : months === 2 ? "شهرين" : months > 2 && months < 11 ? months + " أشهر" : months + " شهر";
        resultParts.push(monthsText);
    }
    if (days > 0) {
        var daysText = days === 1 ? "يوم" : days === 2 ? "يومين" : days > 2 && days < 11 ? days + " أيام" : days + " يوم";
        resultParts.push(daysText);
    }

    result.innerHTML = `عمرك بالتاريخ الميلادي هو:<br> ${resultParts.join(' و ')}`;

    // تحويل العمر إلى التقويم الهجري
    var totalDays = age * 365.25 + months * 30.44 + days;
    var hijriAge = totalDays / 354.36;
    var hijriYears = Math.floor(hijriAge);
    var hijriMonths = Math.floor((hijriAge - hijriYears) * 12);
    var hijriDays = Math.round(((hijriAge - hijriYears) * 12 - hijriMonths) * 30);

    var hijriResultParts = [];
    if (hijriYears > 0) {
        var hijriYearsText = hijriYears === 1 ? "سنة" : hijriYears === 2 ? "سنتين" : hijriYears > 2 && hijriYears < 11 ? hijriYears + " سنوات" : hijriYears + " سنة";
        hijriResultParts.push(hijriYearsText);
    }
    if (hijriMonths > 0) {
        var hijriMonthsText = hijriMonths === 1 ? "شهر" : hijriMonths === 2 ? "شهرين" : hijriMonths > 2 && hijriMonths < 11 ? hijriMonths + " أشهر" : hijriMonths + " شهر";
        hijriResultParts.push(hijriMonthsText);
    }
    if (hijriDays > 0) {
        var hijriDaysText = hijriDays === 1 ? "يوم" : hijriDays === 2 ? "يومين" : hijriDays > 2 && hijriDays < 11 ? hijriDays + " أيام" : hijriDays + " يوم";
        hijriResultParts.push(hijriDaysText);
    }

    result.innerHTML += `<br><br>عمرك بالتاريخ الهجري هو:<br> ${hijriResultParts.join(' و ')}`;
document.getElementById('note').style.display = 'block';
}

function reset() {
    document.getElementById('birthdate').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('error-message').textContent = '';
document.getElementById('note').style.display = 'none';
}