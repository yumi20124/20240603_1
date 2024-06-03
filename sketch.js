let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
	//createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); //呼叫在ml5.js上的net函數，用此函數來判斷各位置，呼叫成功即執行function modelLoaded 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;  //把抓到的幾個點，都放置pose變數內
    skeleton = poses[0].skeleton; //把相關於骨架的點都放到skeleton變數內
  }
}


function modelLoaded() {   //顯示pose model已經準備就緒
  console.log('poseNet ready');
}

function draw() {
    background(0);
		translate(video.width,0)  //因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
		scale(-1,1)    //因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
    image(video, 0, 0);  //顯示你的畫面在螢幕上
		if (pose) {
			let eyeR = pose.rightEye;  //抓到右眼資訊，放到eyeR
			let eyeL = pose.leftEye;   //抓到左眼資訊，放到eyeL
			let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y); //算出左右眼的距離，當作鼻子顯示圓的直徑
			fill(255, 0, 0);
			ellipse(pose.nose.x, pose.nose.y, d); //畫出鼻子的圓
			fill(0, 0, 255);
			ellipse(pose.rightWrist.x, pose.rightWrist.y, 62); //畫出右手腕圓圈
			ellipse(pose.leftWrist.x, pose.leftWrist.y, 62); //畫出左手腕圓圈
			drawKeypoints()
			drawSkeleton()
 		}
}
function drawKeypoints()  {  
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;//找出每一個點的x座標
      let y = pose.keypoints[i].position.y;//找出每一個點的y座標
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
	//print(pose.keypoints.length)
	}
function drawSkeleton()  {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];			
      strokeWeight(2);
      stroke(255,0,0);
      line(a.position.x, a.position.y,b.position.x,b.position.y);			
    }
  }
