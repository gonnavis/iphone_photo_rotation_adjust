# iphone_photo_rotation_adjust

iphone 竖着拍的照片，实际存储却是横着的，然后在照片 EXIF 信息里记录了90度向右旋转的信息。<br>
本方法的主要目的就是把它变成真正竖着的照片，输入一个 file 文件， 输出一个调整过方向的 blob 文件。<br>
blob 格式是 file 格式的父级，一样可以用于 form 表单提交。<br>

使用方法

引入文件
```
  <script src="exif.js"></script>
  <script src="canvas-to-blob.min.js"></script>
  <script src="iphone_photo_rotation_adjust.js"></script>
```
    
js代码
```
  iphone_photo_rotation_adjust(file, 800/*可选 指定输出图像的最大宽度或高度*/).then(function(blob){
    var form_data=new FormData();
    form_data.append('photo',blob,'blob.png');
    // ...
  })
```

基于 exif.js ( https://github.com/exif-js/exif-js 用于读取照片旋转方向 ) 和 canvas-to-blob.min.js ( https://github.com/blueimp/JavaScript-Canvas-to-Blob 用于让 safari 支持 canvas.toBlob 方法)
