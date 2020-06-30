//片元着色器  因为SurfaceTexture比较特殊,这里需要多加一句说明
#extension GL_OES_EGL_image_external : require
precision highp float;
uniform samplerExternalOES vTexture;
varying vec2 aCoord;
const highp vec3 W = vec3(0.2125, 0.7154, 0.0721);

void main (void) {
    float xCoordinate = aCoord.x;
    float yCoordinate = aCoord.y;
    vec4 mask = texture2D(vTexture, vec2(xCoordinate, yCoordinate));
    float luminance = dot(mask.rgb, W);
    gl_FragColor = vec4(vec3(luminance), 1.0);
}