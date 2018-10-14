# Mục lục
* [Chú ý](#chu-y)
* [Giới thiệu](#gioi-thieu)
* [Các chức năng chính](#cac-chuc-nang-chinh)
* [Sơ đồ tổ chức hệ thống](#so-do-to-chuc-he-thong)
* [Framework](#framework)
* [Demo giao diện](#demo-giao-dien)
* [Instruction](#instruction)

<a name="chu-y"></name>

## Chú ý
Project chỉ chạy trên hệ điều hành nhân linux như ubuntu hoặc macos. Hệ điều hành windows sẽ không chạy được project này. Lý do là bigchaidb chỉ hỗ trợ chạy trên hệ điều hành nhân linux.

<a name="gioi-thieu"></name>

## Giới thiệu
Project lưu trữ bằng điện tử dựa trên công nghệ blockchain. Với ưu điểm có thể lưu dữ liệu lâu dài (hơn 50 năm) và tránh được hiển tượng dữ liệu bị sửa đổi bởi một người tấn công vào hệ thống mạng.

<a name="cac-chuc-nang-chinh"></name>

## Các chức năng chính
* Xem bằng đại học bằng hình ảnh minh họa
* Tạo mới một thông tin bằng đại học
* Danh sách sinh viên tốt nghiệp và bằng tương ứng
* Thêm một người dùng mới
* Sửa thông tin người dùng hiện tại
* Đăng nhập, đăng xuất trong hệ thống

<a name="so-do-to-chuc-he-thong"></name>

## Sơ đồ tổ chức hệ thống

![](../img/uit_architecture.png?raw=true)

* Client (sẽ kết nối với BigchianDB server và Django server): xử lý các nghiệp vụ của chương trình, truy xuất và hiển thị thông tin.
* BigChainDB server (sẽ kết nối với Client và MogoDB server): xử lý các vấn đề về bảo mật, xác thực thông tin, chuyển đổi thông tin.
* MongoDB server (sẽ kết nối với BigChainDB server): Lưu trữ dữ liệu, các thông tin không yêu cầu tính riêng tư.
* Django server (sẽ kết nối với Client): Xử lý nhận yêu cầu và gửi trả các thông tin cần thiết, lưu trữ dữ liệu, các thông tin yêu cầu tính 
riêng tư cao.

<a name="framework"></name>

## Framework
* Ứng dụng được xây dựng trên nền tảng client Reactjs và Database server BigchianDB
* Dùng thư viện react-table để thực hiện tìm kiếm lấy dữ liệu và hiển thị danh sách thông tin bằng đại học cần thiết
* Ứng dụng Django server để lưu các thông tin bảo mật như thông tin tài khoản và mật khẩu của người dùng. Do BigchainDB sự cho phép bất kỳ ai cũng có thể đọc dữ liệu nên cần phải sử dụng server riêng đối với các dữ liệu riêng tư

<a name="demo-giao-dien"></name>

## Demo giao diện
1. **Homepage**

    ![](../img/uit-degree_display_homepage.png?raw=true)

2. **Login**

    ![](../img/uit-degree_display_login.png?raw=true)

3. **Admin page**

    ![](../img/uit-degree_display_list-functions.png?raw=true)

<a name="instruction"></name>

## Instruction
Phần này mình xin được viết tiếng anh do một số yêu cầu của thành viên trong nhóm. Các bạn chú ý hệ điều hành windows sẽ không thể chạy project.

### 1 Install Docker
[Docker-compose installed](https://docs.docker.com/compose/install/)
INSTALLED AND RUN DOCKER TO MOVE TO STEP 2.

### 2 Running Docker with bigchain
```
    git clone https://github.com/bigchaindb/bigchaindb.git
    cd bigchaindb
    docker-compose build bigchaindb
```

```
    docker-compose up -d bdb
```

### 3 Clone Backend
1. Check python version:
`python --version`
if not show the python version, Download[here](https://www.python.org) for more
2. go to folder `server`
```
    cd server
```
3. install **virtuallenv**. Open terminal and type follow below:

```
    sudo apt install python-virtualenv
    virtualenv --python=python3.6 myvenv
    source myvenv/bin/activate
```

Third install django:
```
    pip install --upgrade pip
    pip install django~=1.11.0
```

Make Database
```
    python manage.py makemigrations
    python manage.py migrate
```

Then
```
    python manage.py createsuperuser
```
Then type username, and password

Now, running server.
```
    python manage.py runserver
```

4. View json data
go [127.0.0.1:8000/users/](http://127.0.0.1:8000/users) to correct connect server.

### 4 Make new transaction
1. clone this to make new transaction
```
    git clone https://github.com/CongTran96/bigchaindb_example.git
```

2. build packets
```
    cd bigchaindb_example/client
    npm build
```

3. run
```
    npm start
```

4. Get Key
Click create Keypair button
the result like this

| Public key | Private key |
|------------|-------------|
| CkPKFCEkNTrDNXQGA1Pqh1Xjnycu5zJ6YA4KwBKGPrps | 8ZAxXv9fUR8wsgwQaHeVzeBv6rU9Qr661XJBL7XmqPyi |


5. Create new transaction. Type like this
```
    asset: 'nothing'
    metadata: 'nothing'
    public key: see section 4
    private key: see section 4
```

### 5 Open app
1. Clone
```
    git clone https://github.com/CongTran96/UIT_degree.git
```

2. build packets
```
    cd UIT_degree/client
    npm build
```

3. run
```
    npm start
```

Type `14520100` in textinput.
