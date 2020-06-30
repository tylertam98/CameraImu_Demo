//片元着色器  因为SurfaceTexture比较特殊,这里需要多加一句说明
#extension GL_OES_EGL_image_external : require

// 精度
precision mediump float;//精度默认是highp，速度较慢，需设置成mediump，速度为highp的2倍
// 采样点的坐标 来自顶点着色器
varying vec2 aCoord;//顶点着色器传来的（顶点？/每个点？）坐标

// 采样器  -- 需要从代码中传入
uniform samplerExternalOES vTexture;//采集当前点的纹理颜色信息

//void main() {
//    // 内置变量 接受像素值
//    //    gl_FragColor = vec4(1,1,1,1);
//    // texture2D是内置函数,通过采样器采集到aCoord的颜色
//    vec4 color =  texture2D(vTexture,aCoord);
//    gl_FragColor = vec4(color.r,color.g,color.b,color.a);
//}

void main()
{
    lowp vec4 textureColor;//存放中间以及最终输出的纹理颜色向量
    lowp vec4 textureColorOri;//存放初始纹理颜色向量

    float xCoordinate = aCoord.x;//当前坐标x
    float yCoordinate = aCoord.y;//当前坐标y

    highp float redCurveValue;//存放中间变量R值
    highp float greenCurveValue;//存放中间变量G值
    highp float blueCurveValue;//存放中间变量B值

    textureColor = texture2D( vTexture, vec2(xCoordinate, yCoordinate));//获取当前点的RGBA值
    textureColorOri = textureColor;//初始纹理向量即为当前textureColor
    // step1 vTexture 
    redCurveValue = texture2D(vTexture, vec2(textureColor.r, 0.0)).r;//提取当前点R值
    greenCurveValue = texture2D(vTexture, vec2(textureColor.g, 0.0)).g;//提取当前点G值
    blueCurveValue = texture2D(vTexture, vec2(textureColor.b, 0.0)).b;//提取当前点B值
    // step2 level
    redCurveValue = texture2D(vTexture, vec2(redCurveValue, 0.0)).a;//提取当前点R对应的A值
    greenCurveValue = texture2D(vTexture, vec2(greenCurveValue, 0.0)).a;//提取当前点G对应的A值
    blueCurveValue = texture2D(vTexture, vec2(blueCurveValue, 0.0)).a;//提取当前点B对应的A值
    // step3 brightness/constrast adjust 
    redCurveValue = redCurveValue * 1.25 - 0.12549;//根据滤镜需要修改当前点R值（0-1）
    greenCurveValue = greenCurveValue * 1.25 - 0.12549;//根据滤镜需要修改当前点G值（0-1）
    blueCurveValue = blueCurveValue * 1.25 - 0.12549;//根据滤镜需要修改当前点B值（0-1）
    //redCurveValue = (((redCurveValue) > (1.0)) ? (1.0) : (((redCurveValue) < (0.0)) ? (0.0) : (redCurveValue)));
    //greenCurveValue = (((greenCurveValue) > (1.0)) ? (1.0) : (((greenCurveValue) < (0.0)) ? (0.0) : (greenCurveValue)));
    //blueCurveValue = (((blueCurveValue) > (1.0)) ? (1.0) : (((blueCurveValue) < (0.0)) ? (0.0) : (blueCurveValue)));
    // step4 normal blending with original
    textureColor = vec4(redCurveValue, greenCurveValue, blueCurveValue, 1.0);//将修改后的RGBA写回textureColor
    textureColor = (textureColorOri - textureColor) * 0.549 + textureColor;//？？

    gl_FragColor = vec4(textureColor.r, textureColor.g, textureColor.b, 1.0);//实现RGBA修改
} 
