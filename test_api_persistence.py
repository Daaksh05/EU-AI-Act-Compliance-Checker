import requests
import uuid
import time

BASE_URL = "http://localhost:8000"
TEST_EMAIL = f"test_{int(time.time())}@example.com"
TEST_PASSWORD = "testpassword123"

def test_auth_and_persistence():
    print(f"--- Testing user accounts and persistence ---")
    
    # 1. Register
    print(f"1. Registering user: {TEST_EMAIL}...")
    reg_resp = requests.post(f"{BASE_URL}/api/register", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    if reg_resp.status_code != 200:
        print(f"FAILED: Registration failed with {reg_resp.status_code}")
        print(reg_resp.text)
        return
    token = reg_resp.json()["access_token"]
    print("SUCCESS: Registration complete")

    # 2. Login
    print("2. Testing login...")
    login_resp = requests.post(f"{BASE_URL}/api/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    if login_resp.status_code != 200:
        print("FAILED: Login failed")
        return
    print("SUCCESS: Login complete")

    # 3. Check compliance (Authenticated)
    print("3. Running compliance check (Authenticated)...")
    headers = {"Authorization": f"Bearer {token}"}
    check_resp = requests.post(f"{BASE_URL}/api/check", headers=headers, json={
        "description": "An AI system for screening resumes in a hiring process."
    })
    if check_resp.status_code != 200:
        print("FAILED: Compliance check failed")
        return
    report_id = check_resp.json()["report_id"]
    print(f"SUCCESS: Report created with ID: {report_id}")

    # 4. Verify in history
    print("4. Verifying report in history...")
    history_resp = requests.get(f"{BASE_URL}/api/reports", headers=headers)
    if history_resp.status_code != 200:
        print("FAILED: Fetching history failed")
        return
    
    reports = history_resp.json()
    found = any(r["id"] == report_id for r in reports)
    if found:
        print(f"SUCCESS: Report {report_id} found in user history!")
    else:
        print("FAILED: Report not found in history")

    # 5. Verify unauthenticated history fails
    print("5. Verifying unauthenticated history block...")
    history_fail = requests.get(f"{BASE_URL}/api/reports")
    if history_fail.status_code == 401:
        print("SUCCESS: Unauthenticated access blocked correctly")
    else:
        print(f"FAILED: Expected 401, got {history_fail.status_code}")

if __name__ == "__main__":
    try:
        test_auth_and_persistence()
    except Exception as e:
        print(f"ERROR: {e}")
        print("Suggestion: Ensure the server is running on http://localhost:8000 before running this test.")
