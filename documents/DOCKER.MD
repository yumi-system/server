# Docker化环境

## MySQL

### 使用官方镜像

**pull**

```sh
docker pull mysql:8
```

**RUN**

```sh
docker run --name yumi-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8 --charater-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

上述设置可以写在`my.conf`里然后挂载到镜像里的目录

### 自定义MySQL镜像

**Dockerfile:**

```dockerfile
### @see https://hub.docker.com/_/mysql
FROM mysql:8

MAINTAINER sjym90@gmail.com

## 将所需的文件放到容器中，这会覆盖镜像原有文件
# ADD mysql/my.cnf /etc/mysql/conf.d/my.cnf
# ADD mysqld_charset.cnf /etc/mysql/conf.d/mysqld_charset.cnf

### 设置环境变量

## 设置免密登录
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
# 设置用户名和密码
ENV MYSQL_USER yumi
# ENV MYSQL_PASS **Random**
# 设置主从复制模式下的环境变量
# ENV REPLICATION_MASTER **False**
# ENV REPLICATION_SLAVE **False**
# ENV REPLICATION_USER replica
# ENV REPLICATION_PASS replica

# 设置允许挂载的卷，用来备份数据库和配置文件
# VOLUME ["/etc/mysql/conf.d", "/var/lib/mysql", ""]

### 设置可以映射的端口
EXPOSE 3306
```

**CLI:**

BUILD:
```sh
docker build -t yumimysql:lastest
```

RUN:

```sh
docker run --name some-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d yumimysql:lastest
```

