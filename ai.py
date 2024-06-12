import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# List of known malicious IPs (for training purposes)
known_malicious_ips = [
    "1.3.3.7", "5.6.7.8", "8.8.8.8", "12.34.56.78", "23.45.67.89", 
    "45.67.89.101", "67.89.101.123", "89.101.123.145", "123.145.167.189", 
    "145.167.189.201", "192.168.1.1", "192.168.1.2", "203.0.113.1", 
    "203.0.113.2", "10.0.0.1", "10.0.0.2", "172.16.0.1", "172.16.0.2", 
    "192.0.2.1", "192.0.2.2", "198.51.100.1", "198.51.100.2", "192.88.99.1", 
    "192.88.99.2", "240.0.0.1", "240.0.0.2", "203.0.113.3", "203.0.113.4", 
    "10.0.0.3", "10.0.0.4", "172.16.0.3", "172.16.0.4", "192.0.2.3", 
    "192.0.2.4", "198.51.100.3", "198.51.100.4", "192.88.99.3", "192.88.99.4", 
    "240.0.0.3", "240.0.0.4"
]

# Load the CSV file
file_path = 'report1710215971890.csv.gz'
df = pd.read_csv(file_path)

# Step 1: Data Preprocessing
# Extract relevant features from Raw Event Log
def extract_features(row):
    log = row['Raw Event Log']
    ip_pattern = re.compile(r'(\d+\.\d+\.\d+\.\d+)')
    ips = ip_pattern.findall(log)
    is_failed = int('failed' in log.lower() or 'error' in log.lower() or 'unauthorized' in log.lower())
    return ips, is_failed

df[['IPs', 'IsFailed']] = df.apply(extract_features, axis=1, result_type="expand")

# Flatten the IPs into individual rows for labeling
flat_df = df.explode('IPs').dropna(subset=['IPs'])
flat_df['Label'] = flat_df['IsFailed']

# Step 2: Feature Engineering
# Convert IP addresses to numerical features
def ip_to_features(ip):
    return [int(part) for part in ip.split('.')]

flat_df['IP_Features'] = flat_df['IPs'].apply(ip_to_features)
flat_df[['Feature1', 'Feature2', 'Feature3', 'Feature4']] = pd.DataFrame(flat_df['IP_Features'].tolist(), index=flat_df.index)

# Label known malicious IPs
flat_df['Label'] = flat_df.apply(lambda row: 1 if row['IPs'] in known_malicious_ips else row['Label'], axis=1)

# Select features and labels
features = flat_df[['Feature1', 'Feature2', 'Feature3', 'Feature4']]
labels = flat_df['Label']

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Step 3: Model Training
# Train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predict on test data
y_pred = clf.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Model Accuracy: {accuracy}")
print(f"Classification Report:\n{report}")

# Step 4: Extract and List Malicious IPs
# Filter the dataset to find IPs predicted as malicious
malicious_ips = flat_df.loc[clf.predict(features) == 1, 'IPs'].unique()

print("List of Malicious IPs:")
print(malicious_ips)