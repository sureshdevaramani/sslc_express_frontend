import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  constructor() { }
  image = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.incimages.com%2Fuploaded_files%2Fimage%2F1920x1080%2Fgetty_655998316_2000149920009280219_363765.jpg&imgrefurl=https%3A%2F%2Fwww.inc.com%2Fchristina-desmarais%2F21-books-to-read-if-you-want-to-get-ahead-in-business-life.html&tbnid=BlUCjGvmpXjLRM&vet=12ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ..i&docid=WpfJGyIp7epdTM&w=1920&h=1080&q=books%20images&ved=2ahUKEwi5-PGggJLxAhW2ynMBHdmZAp0QMygAegUIARDQAQ';

  displayObj: any = [
    {
      "questionNo":"1",
      "question":"Who is PM of india",
      "optionA":"Modi",
      "optionB":"Amith Shaw",
      "optionC":"ABC",
      "optionD":"none of the above",
      "rightoption":"A",
      "imageUrl":"https://techboomers.com/wp-content/uploads/2017/12/sites-like-amazon-for-buying-books-h.jpg",
      "yourAnswer":"Modi"
    }
  ]
  ngOnInit(): void {
    console.log("HII")
    
  }


}
