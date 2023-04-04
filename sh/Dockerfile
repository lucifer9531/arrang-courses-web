# 该镜像需要依赖的基础镜像
FROM nginx
# 将当前目录下的jar包复制到docker容器的/目录下
ADD ./dist /usr/share/nginx/html/
# 将当前目录下的conf文件复制到docker容器的/目录下
ADD ./arranging-courses.conf /etc/nginx/conf.d/
# 指定维护者的名字
MAINTAINER lucifer
