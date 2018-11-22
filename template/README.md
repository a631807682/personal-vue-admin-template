个人后台管理系统模板
========

# 发布

## nginx 配置
```
location / {
  root /data/www/template;
  try_files $uri $uri/ /index.html;
}
```

## sh脚本

`local_deploy.sh`可能结果`windows`编辑，需要改成`unix`文件格式。
> vim local_deploy.sh
> :set fileformat=unix 

## 防火墙

> service iptables stop
> chkconfig iptables off
