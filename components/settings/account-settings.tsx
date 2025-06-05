"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Crown,
  CreditCard,
  Shield,
  Camera,
  AlertTriangle,
} from "lucide-react";

export default function AccountSettings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Full-stack developer passionate about AI and code optimization.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    company: "Tech Corp",
    jobTitle: "Senior Developer",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const handleProfileSave = () => {
    console.log("Saving profile:", profile);
  };

  const handlePasswordChange = () => {
    console.log("Changing password...");
  };

  const handleAvatarChange = () => {
    console.log("Changing avatar...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={handleAvatarChange}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.email}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro Plan
                </Badge>
                <Badge variant="outline">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="flex-1"
              />
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Verify
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) =>
                  setProfile({ ...profile, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={profile.jobTitle}
                onChange={(e) =>
                  setProfile({ ...profile, jobTitle: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={profile.website}
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
            />
          </div>

          <Button onClick={handleProfileSave} className="btn-primary">
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your password and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={security.currentPassword}
                onChange={(e) =>
                  setSecurity({ ...security, currentPassword: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={security.newPassword}
                onChange={(e) =>
                  setSecurity({ ...security, newPassword: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={security.confirmPassword}
                onChange={(e) =>
                  setSecurity({ ...security, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <Button onClick={handlePasswordChange} className="btn-primary">
            Change Password
          </Button>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">
                {security.twoFactorEnabled ? "Disable" : "Enable"} 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription & Billing
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-950/20 rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary-600" />
                <span className="font-semibold">Pro Plan</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                $29/month • Next billing: January 15, 2024
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Manage Billing</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Plan Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Unlimited AI analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Advanced code insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Team collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Priority support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Account Actions
          </CardTitle>
          <CardDescription>Manage your account status and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-yellow-700 dark:text-yellow-300">
                Deactivate Account
              </Label>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Temporarily disable your account (can be reactivated)
              </p>
            </div>
            <Button variant="outline">Deactivate</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-red-700 dark:text-red-300">
                Delete Account
              </Label>
              <p className="text-sm text-red-600 dark:text-red-400">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
