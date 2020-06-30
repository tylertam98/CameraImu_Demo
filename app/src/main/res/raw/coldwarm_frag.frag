//片元着色器  因为SurfaceTexture比较特殊,这里需要多加一句说明
#extension GL_OES_EGL_image_external : require
precision mediump float;

//在片元着色器这里添加这个 sampler2D 表示我们要添加2D贴图
uniform samplerExternalOES u_TextureUnit;
//定义一个u_ChangeColor,因为颜色的变量是RGB,所以使用vec3
uniform vec3 u_ChangeColor;
varying vec2 aCoord;

//modifyColor.将color限制在rgb
void modifyColor(vec4 color){
    color.r=max(min(color.r,1.0),0.0);
    color.g=max(min(color.g,1.0),0.0);
    color.b=max(min(color.b,1.0),0.0);
    color.a=max(min(color.a,1.0),0.0);
}

void main(){
    //得到2d color
    vec4 nColor=texture2D(u_TextureUnit,aCoord);
    //简单色彩处理，冷暖色调、增加亮度、降低亮度等
    vec4 deltaColor=nColor+vec4(u_ChangeColor,0.0);
    modifyColor(deltaColor);
    gl_FragColor=deltaColor;
}