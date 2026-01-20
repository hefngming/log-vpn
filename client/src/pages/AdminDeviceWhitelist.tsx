/**
 * Admin Device Whitelist Management Page
 * Allows administrators to manage device whitelist for users
 */

import { useState, useEffect } from 'react';
import { trpc } from '../lib/trpc';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

interface WhitelistEntry {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  maxDevices: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDeviceWhitelist() {
  const { toast } = useToast();
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState<{ id: number; email: string } | null>(null);
  const [maxDevices, setMaxDevices] = useState(2);
  const [reason, setReason] = useState('');

  // Fetch whitelist
  const { data: whitelistData, refetch } = trpc.admin.getDeviceWhitelist.useQuery();

  useEffect(() => {
    if (whitelistData) {
      setWhitelist(whitelistData);
    }
  }, [whitelistData]);

  // Add to whitelist mutation
  const addToWhitelist = trpc.admin.addDeviceWhitelist.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User added to device whitelist',
      });
      refetch();
      setSelectedUser(null);
      setMaxDevices(2);
      setReason('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update whitelist mutation
  const updateWhitelist = trpc.admin.updateDeviceWhitelist.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Whitelist entry updated',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Remove from whitelist mutation
  const removeFromWhitelist = trpc.admin.removeDeviceWhitelist.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User removed from device whitelist',
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Search user by email
  const { data: searchResult, refetch: searchUser } = trpc.admin.searchUserByEmail.useQuery(
    { email: searchEmail },
    { enabled: false }
  );

  const handleSearch = () => {
    if (!searchEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }
    searchUser();
  };

  useEffect(() => {
    if (searchResult) {
      setSelectedUser(searchResult);
    }
  }, [searchResult]);

  const handleAddToWhitelist = () => {
    if (!selectedUser) {
      toast({
        title: 'Error',
        description: 'Please select a user first',
        variant: 'destructive',
      });
      return;
    }

    if (maxDevices < 1 || maxDevices > 10) {
      toast({
        title: 'Error',
        description: 'Max devices must be between 1 and 10',
        variant: 'destructive',
      });
      return;
    }

    addToWhitelist.mutate({
      userId: selectedUser.id,
      maxDevices,
      reason,
    });
  };

  const handleUpdateWhitelist = (userId: number, newMaxDevices: number, newReason: string) => {
    updateWhitelist.mutate({
      userId,
      maxDevices: newMaxDevices,
      reason: newReason,
    });
  };

  const handleRemoveFromWhitelist = (userId: number) => {
    if (confirm('Are you sure you want to remove this user from the whitelist?')) {
      removeFromWhitelist.mutate({ userId });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Device Whitelist Management</h1>

      {/* Add User to Whitelist */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add User to Whitelist</CardTitle>
          <CardDescription>
            Allow specific users to log in from multiple devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Search user by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {selectedUser && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Selected User:</p>
                <p className="text-lg">{selectedUser.email}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Max Devices</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={maxDevices}
                  onChange={(e) => setMaxDevices(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Input
                  placeholder="e.g., Enterprise user, Premium plan"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleAddToWhitelist}
              disabled={!selectedUser || addToWhitelist.isLoading}
            >
              {addToWhitelist.isLoading ? 'Adding...' : 'Add to Whitelist'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Whitelist Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Whitelist</CardTitle>
          <CardDescription>
            Users with multi-device login permission
          </CardDescription>
        </CardHeader>
        <CardContent>
          {whitelist.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No users in whitelist
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">User</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Max Devices</th>
                    <th className="text-left p-4">Reason</th>
                    <th className="text-left p-4">Added At</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {whitelist.map((entry) => (
                    <tr key={entry.id} className="border-b">
                      <td className="p-4">{entry.userName}</td>
                      <td className="p-4">{entry.userEmail}</td>
                      <td className="p-4">
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          defaultValue={entry.maxDevices}
                          className="w-20"
                          onBlur={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (newValue !== entry.maxDevices) {
                              handleUpdateWhitelist(entry.userId, newValue, entry.reason);
                            }
                          }}
                        />
                      </td>
                      <td className="p-4">
                        <Input
                          defaultValue={entry.reason}
                          onBlur={(e) => {
                            if (e.target.value !== entry.reason) {
                              handleUpdateWhitelist(
                                entry.userId,
                                entry.maxDevices,
                                e.target.value
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="p-4">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveFromWhitelist(entry.userId)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
