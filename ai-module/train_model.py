import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "data", "sample_skill_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "skill_readiness_model.joblib")
REPORT_PATH = os.path.join(BASE_DIR, "models", "training_report.txt")
PLOT_PATH = os.path.join(BASE_DIR, "models", "readiness_distribution.png")

FEATURES = [
    "skill_count",
    "learning_hours",
    "certifications",
    "projects_completed",
    "proficiency_score",
]


def train():
    data = pd.read_csv(DATA_PATH)
    x = data[FEATURES]
    y = data["readiness_score"]

    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.25, random_state=42
    )

    model = RandomForestRegressor(n_estimators=150, random_state=42)
    model.fit(x_train, y_train)
    predictions = model.predict(x_test)

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)

    with open(REPORT_PATH, "w", encoding="utf-8") as report:
        report.write("SkillSphere Random Forest Regressor Report\n")
        report.write(f"Rows: {len(data)}\n")
        report.write(f"Mean Absolute Error: {mean_absolute_error(y_test, predictions):.2f}\n")
        report.write(f"R2 Score: {r2_score(y_test, predictions):.2f}\n")

    plt.figure(figsize=(7, 4))
    data["readiness_score"].plot(kind="hist", bins=8, color="#2563eb", edgecolor="white")
    plt.title("Readiness Score Distribution")
    plt.xlabel("Score")
    plt.tight_layout()
    plt.savefig(PLOT_PATH)
    print(f"Model saved to {MODEL_PATH}")


if __name__ == "__main__":
    train()
