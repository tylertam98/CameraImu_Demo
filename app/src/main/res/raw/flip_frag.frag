//片元着色器  因为SurfaceTexture比较特殊,这里需要多加一句说明
#extension GL_OES_EGL_image_external : require

precision highp float;
uniform samplerExternalOES vTexture;
varying vec2 aCoord;

void main (void) {

    vec4 color = texture2D(vTexture, vec2(1.0 - aCoord.x, 1.0 - aCoord.y));

    gl_FragColor = color;
}