function iphone_photo_rotation_adjust(file, max_width_or_height) {
  return new Promise(function(resolve, reject) {


    EXIF.getData(file, function() {

      var orientation = this.exifdata.Orientation
      // case 1: normal
      // case 2: horizontal flip 
      // case 3: 180° rotate left 
      // case 4: vertical flip 
      // case 5: vertical flip + 90 rotate right 
      // case 6: 90° rotate right 
      // case 7: horizontal flip + 90 rotate right 
      // case 8: 90° rotate left 
      // iphone photo has 1 3 6 8

      var data_url = URL.createObjectURL(file)

      var img=document.createElement('img')
      img.src=data_url

      var canvas=document.createElement('canvas')
      var ctx=canvas.getContext('2d')

      img.onload=function(){

      	var result_width, result_height
      	if(max_width_or_height){
      		if(img.width>img.height){
      			var ratio=max_width_or_height/img.width
	      		result_width=img.width*ratio
	      		result_height=img.height*ratio
      		}
      		else{
      			var ratio=max_width_or_height/img.height
	      		result_width=img.width*ratio
	      		result_height=img.height*ratio
      		}
      	}
      	else{
      		result_width=img.width
      		result_height=img.height
      	}

        if (orientation === 3) {
          canvas.width=result_width
          canvas.height=result_height
          ctx.translate(result_width, result_height) 
          ctx.rotate(Math.PI);
        } else if (orientation === 6) {
          canvas.width=result_height
          canvas.height=result_width
          ctx.translate(result_height, 0) 
          ctx.rotate(Math.PI / 2);
        } else if (orientation === 8) {
          canvas.width=result_height
          canvas.height=result_width
          ctx.translate(0, result_width) 
          ctx.rotate( - Math.PI / 2);
        } else {
          canvas.width=result_width
          canvas.height=result_height
        }
        ctx.drawImage(img, 0, 0, result_width, result_height)
        canvas.toBlob(function(blob){
        	resolve(blob)
        })
      }
			if(img.complete){
				img.onload()
			}

    })
  })
}