"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Avatar, Button, Card, DatePicker, Form, Input, Select, Typography, message, Upload, Divider, Spin } from "antd"
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import moment from "moment"
import type { UploadProps } from "antd"
import type { RcFile } from "antd/es/upload/interface"
import { getUserDataFromLocalStorage } from "../../../consts/variable"
import { CustomerGetProfile } from "../../../services/account.services"

const { Title, Text } = Typography
const { Option } = Select

interface UserProfile {
  firstName: string
  lastName: string
  gender: string | number
  dateOfBirth: string
  address: string
  avatarUrl: string | null
  email: string
  phoneNumber: string
  emailConfirmed: boolean
  personalWebsiteUrl: string | null
  portfolioUrl: string | null
  role: string | number
  id: string
  creationDate: string
  createdBy: string | null
  modificationDate: string
  modifiedBy: string
  deletionDate: string | null
  deletedBy: string | null
  isDeleted: boolean
}

interface EditableProfile {
  firstName: string
  lastName: string
  gender: number
  dateOfBirth: string
  address: string
  avatarUrl: string
  personalWebsiteUrl: string
  portfolioUrl: string
  phoneNumber: string
  role: number
}

// Mock API function to update profile
const updateProfileService = async (profileData: EditableProfile): Promise<boolean> => {
  // This would be replaced with an actual API call
  console.log("Updating profile with data:", profileData)
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })
}

// Mock API function to get user profile

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()
    const user = getUserDataFromLocalStorage()
  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const userData = await  CustomerGetProfile(user?.userId+'')
      setProfile(userData?.data)
      // Initialize form with user data
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender === "Male" ? 0 : userData.gender === "Female" ? 1 : 2,
        dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth) : null,
        address: userData.address,
        avatarUrl: userData.avatarUrl,
        personalWebsiteUrl: userData.personalWebsiteUrl,
        portfolioUrl: userData.portfolioUrl,
        phoneNumber: userData.phoneNumber,
        role: typeof userData.role === "string" ? (userData.role === "Admin" ? 0 : 1) : userData.role,
      })
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      message.error("Failed to load profile information")
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      form.resetFields()
      setIsEditing(false)
    } else {
      // Start editing
      setIsEditing(true)
    }
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setSubmitting(true)

      // Convert form values to the expected format
      const updatedProfile: EditableProfile = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DDTHH:mm:ss.SSSZ") : "",
      }

      const success = await updateProfileService(updatedProfile)
      if (success) {
        message.success("Profile updated successfully")
        setIsEditing(false)
        // Refresh profile data
        fetchUserProfile()
      } else {
        message.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Form validation failed:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const uploadProps: UploadProps = {
    name: "avatar",
    beforeUpload: beforeUpload,
    customRequest: ({ file, onSuccess }) => {
      // Mock successful upload after 1 second
      setTimeout(() => {
        // In a real app, you would upload to a server and get a URL back
        const mockUrl = "https://via.placeholder.com/150"
        form.setFieldsValue({ avatarUrl: mockUrl })
        onSuccess?.(mockUrl, file as any)
      }, 1000)
    },
    showUploadList: false,
  }

  const getGenderText = (gender: string | number) => {
    if (gender === 0 || gender === "Male") return "Male"
    if (gender === 1 || gender === "Female") return "Female"
    return "Other"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card
        className="shadow-md"
        title={
          <div className="flex justify-between items-center">
            <Title level={3} className="m-0">
              Profile Information
            </Title>
            <Button
              type="primary"
              icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
              onClick={handleEditToggle}
              danger={isEditing}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            gender: profile?.gender === "Male" ? 0 : profile?.gender === "Female" ? 1 : 2,
            dateOfBirth: profile?.dateOfBirth ? moment(profile.dateOfBirth) : null,
            address: profile?.address,
            avatarUrl: profile?.avatarUrl,
            personalWebsiteUrl: profile?.personalWebsiteUrl,
            portfolioUrl: profile?.portfolioUrl,
            phoneNumber: profile?.phoneNumber,
            role: typeof profile?.role === "string" ? (profile.role === "Admin" ? 0 : 1) : profile?.role,
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                {isEditing ? (
                  <Form.Item name="avatarUrl" noStyle>
                    <Upload {...uploadProps}>
                      <div className="relative">
                        <Avatar
                          size={120}
                          icon={<UserOutlined />}
                          src={form.getFieldValue("avatarUrl")}
                          className="mb-2"
                        />
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                          <UploadOutlined style={{ fontSize: "16px" }} />
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>
                ) : (
                  <Avatar size={120} icon={<UserOutlined />} src={profile?.avatarUrl || undefined} />
                )}
              </div>
              <Text strong className="text-lg">
                {profile?.firstName} {profile?.lastName}
              </Text>
              <Text type="secondary">{profile?.email}</Text>
              <Text className="mt-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                {profile?.role}
              </Text>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter your first name" }]}
                >
                  {isEditing ? (
                    <Input placeholder="First Name" />
                  ) : (
                    <div className="border-b pb-1">{profile?.firstName}</div>
                  )}
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter your last name" }]}
                >
                  {isEditing ? (
                    <Input placeholder="Last Name" />
                  ) : (
                    <div className="border-b pb-1">{profile?.lastName}</div>
                  )}
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please select your gender" }]}
                >
                  {isEditing ? (
                    <Select placeholder="Select gender">
                      <Option value={0}>Male</Option>
                      <Option value={1}>Female</Option>
                      <Option value={2}>Other</Option>
                    </Select>
                  ) : (
                    <div className="border-b pb-1">{getGenderText(profile?.gender || "")}</div>
                  )}
                </Form.Item>

                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: "Please select your date of birth" }]}
                >
                  {isEditing ? (
                    <DatePicker className="w-full" format="YYYY-MM-DD" />
                  ) : (
                    <div className="border-b pb-1 flex items-center gap-2">
                      <CalendarOutlined className="text-gray-400" />
                      {profile?.dateOfBirth ? moment(profile.dateOfBirth).format("YYYY-MM-DD") : "Not specified"}
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                  {isEditing ? (
                    <Input placeholder="Phone Number" />
                  ) : (
                    <div className="border-b pb-1 flex items-center gap-2">
                      <PhoneOutlined className="text-gray-400" />
                      {profile?.phoneNumber || "Not specified"}
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter your address" }]}
                >
                  {isEditing ? (
                    <Input placeholder="Address" />
                  ) : (
                    <div className="border-b pb-1 flex items-center gap-2">
                      <HomeOutlined className="text-gray-400" />
                      {profile?.address || "Not specified"}
                    </div>
                  )}
                </Form.Item>
              </div>

              <Divider orientation="left">Additional Information</Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Personal Website" name="personalWebsiteUrl">
                  {isEditing ? (
                    <Input placeholder="https://yourwebsite.com" />
                  ) : (
                    <div className="border-b pb-1 flex items-center gap-2">
                      <GlobalOutlined className="text-gray-400" />
                      {profile?.personalWebsiteUrl || "Not specified"}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Portfolio URL" name="portfolioUrl">
                  {isEditing ? (
                    <Input placeholder="https://portfolio.com" />
                  ) : (
                    <div className="border-b pb-1 flex items-center gap-2">
                      <GlobalOutlined className="text-gray-400" />
                      {profile?.portfolioUrl || "Not specified"}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Role" name="role">
                  {isEditing ? (
                    <Select placeholder="Select role">
                      <Option value={0}>Admin</Option>
                      <Option value={1}>User</Option>
                    </Select>
                  ) : (
                    <div className="border-b pb-1">{profile?.role}</div>
                  )}
                </Form.Item>
              </div>

              {isEditing && (
                <div className="flex justify-end mt-6">
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSubmit}
                    loading={submitting}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default ProfilePage
