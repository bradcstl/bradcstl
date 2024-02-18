provider "aws" {
  region     = "eu-west-2"
}
#   ami           = "ami-0e5f882be1900e43b"
resource "aws_vpc" "actpro-vpc" {
     cidr_block = "10.0.0.0/16"
      tags = {
        Name = "actpro-net"
  }

}
resource "aws_subnet" "front-end-net" {
  vpc_id     = aws_vpc.actpro-vpc.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "front"
  }
}
resource "aws_subnet" "back-end-net" {
  vpc_id     = aws_vpc.actpro-vpc.id
  cidr_block = "10.0.2.0/24"

  tags = {
    Name = "back"
  }
}
resource "aws_internet_gateway" "actpro-igw" {
  vpc_id = aws_vpc.actpro-vpc.id
  tags = {
    Name = "actpro-igw"
  }
}

resource "aws_route_table" "actpro-rt-front" {
  vpc_id = aws_vpc.actpro-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.actpro-igw.id
  } 
  tags = {
    Name = "actpro-rt-front"
  }
}
resource "aws_route_table_association" "a-front-net" {
  subnet_id      = aws_subnet.front-end-net.id
  route_table_id = aws_route_table.actpro-rt-front.id
}

resource "aws_security_group" "actpro-sg" {
  name        = "ssh-web"
  description = "Allow 22 and 80 ports traffic"
  vpc_id      = aws_vpc.actpro-vpc.id

  ingress {
    description      = "SSH from VPC"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "WEB from VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "HTTPS App nodejs - todo"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    description      = "Postgresql"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["10.0.1.0/24"]
  }


  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ssh-web-sg"
  }
}

data "aws_ami" "ubuntu-latest" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical 
}

resource "aws_instance" "app-todo" {
  ami           = data.aws_ami.ubuntu-latest.id
  instance_type = "t2.micro"
  subnet_id = aws_subnet.front-end-net.id
  vpc_security_group_ids = [aws_security_group.actpro-sg.id]
  associate_public_ip_address = true

  key_name = "aws-n"
  
  tags = {
    Name = "app-todo"
  }
}

resource "aws_instance" "db1" {
  ami           = data.aws_ami.ubuntu-latest.id
  instance_type = "t2.micro"
  subnet_id = aws_subnet.front-end-net.id
  vpc_security_group_ids = [aws_security_group.actpro-sg.id]
  associate_public_ip_address = true

  key_name = "aws-n"
  
  tags = {
    Name = "db1"
  }
}

resource "aws_instance" "db2" {
  ami           = data.aws_ami.ubuntu-latest.id
  instance_type = "t2.micro"
  subnet_id = aws_subnet.front-end-net.id
  vpc_security_group_ids = [aws_security_group.actpro-sg.id]
  associate_public_ip_address = true

  key_name = "aws-n"
  
  tags = {
    Name = "db2"
  }
}
