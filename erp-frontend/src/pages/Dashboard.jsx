export default function Dashboard() {
    return (
        <div>
            <h2>📊 ERP 대시보드</h2>
            <p>시스템 요약 정보를 확인하세요.</p>

            <div className="dashboard-cards">
                <div className="card">부서 수: 5</div>
                <div className="card">직원 수: 50</div>
                <div className="card">금일 작업 지시: 12</div>
                <div className="card">미처리 요청: 3</div>
            </div>
        </div>
    );
}