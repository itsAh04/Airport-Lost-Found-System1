from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = 'lams_airport_secure_key_master' 
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'lost_found.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)

# --- الموديلات (Database Models) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))

class Staff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(20), unique=True)
    fullname = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    role = db.Column(db.String(50))
    password = db.Column(db.String(200))
    status = db.Column(db.String(20), default='active')

class LostItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100))
    category = db.Column(db.String(50))
    color = db.Column(db.String(30))
    location = db.Column(db.String(100))
    date_lost = db.Column(db.String(50))
    description = db.Column(db.Text)
    reporter_name = db.Column(db.String(100))
    reporter_phone = db.Column(db.String(20))
    reporter_email = db.Column(db.String(120))
    image_file = db.Column(db.String(200))
    status = db.Column(db.String(50), default='Searching')

class FoundItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100))
    category = db.Column(db.String(50))
    color = db.Column(db.String(30))
    location = db.Column(db.String(100))
    date_found = db.Column(db.String(50))
    description = db.Column(db.Text)
    finder_name = db.Column(db.String(100))
    finder_phone = db.Column(db.String(20))
    image_file = db.Column(db.String(200))
    status = db.Column(db.String(50), default='Stored')

# --- مسارات المسافر (Traveler Routes) ---
@app.route('/')
def index(): 
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(email=request.form.get('email')).first()
        if user and check_password_hash(user.password, request.form.get('password')):
            session['user_id'] = user.id
            return redirect(url_for('user_home'))
        flash('خطأ في البريد الإلكتروني أو كلمة المرور', 'danger')
    return render_template('login.html')

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        # محاكاة إرسال بريد استعادة كلمة المرور
        flash('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني!', 'success')
        return redirect(url_for('login'))
    return render_template('forgot_password.html')

@app.route('/register_user', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        pw = request.form.get('password')
        conf_pw = request.form.get('confirm_password')
        if pw != conf_pw:
            flash('كلمات المرور غير متطابقة!', 'danger')
            return redirect(url_for('register_user'))
            
        hashed_pw = generate_password_hash(pw, method='pbkdf2:sha256')
        # نمرر البيانات لصفحة الـ OTP للتأكيد قبل الحفظ النهائي
        return render_template('otp.html', 
                               name=request.form.get('fullname'), 
                               email=request.form.get('email'), 
                               password=hashed_pw)
    return render_template('register_user.html')

@app.route('/otp', methods=['POST'])
def otp():
    # هنا يتم حفظ المستخدم رسمياً بعد "نجاح" عملية الـ OTP
    new_user = User(
        fullname=request.form.get('hidden_name'), 
        email=request.form.get('hidden_email'), 
        password=request.form.get('hidden_password')
    )
    db.session.add(new_user)
    db.session.commit()
    flash('تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول', 'success')
    return redirect(url_for('login'))

@app.route('/user_home')
def user_home():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    user = User.query.get(session['user_id'])
    return render_template('user_login.html', user=user)

@app.route('/lost_report')
def lost_report():
    return render_template('lost_report.html')

@app.route('/found_report')
def found_report():
    return render_template('found_report.html')

@app.route('/submit_lost', methods=['POST'])
def submit_lost():
    new_lost = LostItem(
        item_name=request.form.get('itemName'), 
        category=request.form.get('category'), 
        color=request.form.get('color'), 
        location=request.form.get('location'), 
        date_lost=request.form.get('dateLost'), 
        description=request.form.get('description'),
        reporter_name=request.form.get('reporterName'), 
        reporter_phone=request.form.get('reporterPhone'),
        reporter_email=request.form.get('reporterEmail'), 
        status='Searching')
    db.session.add(new_lost)
    db.session.commit()
    flash('تم تسجيل بلاغ المفقودات بنجاح!', 'success')
    return redirect(url_for('lost_report'))

@app.route('/submit_found', methods=['POST'])
def submit_found():
    new_found = FoundItem(
        item_name=request.form.get('itemName'), 
        category=request.form.get('category'), 
        color=request.form.get('color'), 
        location=request.form.get('location'), 
        date_found=request.form.get('dateFound'), 
        description=request.form.get('description'),
        finder_name=request.form.get('finderName'), 
        finder_phone=request.form.get('finderPhone'), 
        status='Stored')
    db.session.add(new_found)
    db.session.commit()
    flash('تم تسجيل الغرض المعثور عليه في النظام!', 'success')
    return redirect(url_for('found_report'))

# --- مسارات الموظف (Staff Routes) ---
@app.route('/staff_login', methods=['GET', 'POST'])
def staff_login():
    if request.method == 'POST':
        staff = Staff.query.filter_by(emp_id=request.form.get('empId')).first()
        if staff and check_password_hash(staff.password, request.form.get('empPass')):
            session['staff_id'] = staff.emp_id
            return redirect(url_for('staff_dashboard'))
        flash('رقم الموظف أو كلمة المرور غير صحيحة', 'danger')
    return render_template('staff_login.html')

@app.route('/staff_dashboard')
def staff_dashboard():
    if 'staff_id' not in session: return redirect(url_for('staff_login'))
    return render_template('staff_dashboard.html')

@app.route('/staff_reports')
def staff_reports():
    if 'staff_id' not in session: return redirect(url_for('staff_login'))
    return render_template('staff_reports.html', 
                           lost_items=LostItem.query.all(), 
                           found_items=FoundItem.query.all())

@app.route('/update_status/<item_type>/<int:item_id>', methods=['POST'])
def update_status(item_type, item_id):
    item = LostItem.query.get(item_id) if item_type == 'lost' else FoundItem.query.get(item_id)
    if item:
        item.status = request.form.get('newStatus')
        db.session.commit()
        flash('تم تحديث حالة الغرض بنجاح', 'success')
    return redirect(url_for('staff_reports'))

# --- مسارات الإدارة (Admin Routes) ---
@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        if request.form.get('adminId') == '1001' and request.form.get('adminPass') == 'admin123':
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        flash('بيانات دخول المسؤول غير صحيحة', 'danger')
    return render_template('admin_login.html')

@app.route('/admin_dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'): return redirect(url_for('admin_login'))
    
    all_lost = LostItem.query.filter_by(status='Searching').all()
    all_found = FoundItem.query.filter_by(status='Stored').all()
    # منطق المطابقات السريع للداشبورد
    matches_count = sum(1 for l in all_lost for f in all_found if l.category == f.category)
    
    stats = {
        'lost': LostItem.query.count(),
        'found': FoundItem.query.count(),
        'matches': matches_count
    }
    return render_template('admin_dashboard.html', stats=stats)

@app.route('/staff_manage')
def staff_manage():
    if not session.get('admin_logged_in'): return redirect(url_for('admin_login'))
    return render_template('staff_manage.html', staff_list=Staff.query.all())

@app.route('/add_staff', methods=['POST'])
def add_staff():
    import random
    new_id = str(random.randint(100, 999))
    new_s = Staff(
        emp_id=new_id, 
        fullname=request.form.get('staffName'),
        phone=request.form.get('staffPhone'),
        email=request.form.get('staffEmail'),
        role=request.form.get('staffRole'),
        password=generate_password_hash("1234", method='pbkdf2:sha256')
    )
    db.session.add(new_s)
    db.session.commit()
    flash(f'تمت إضافة الموظف بنجاح. رقم الموظف: {new_id}', 'success')
    return redirect(url_for('staff_manage'))

@app.route('/matches')
def matches():
    if not session.get('admin_logged_in'): return redirect(url_for('admin_login'))
    matches_list = []
    all_lost = LostItem.query.filter_by(status='Searching').all()
    all_found = FoundItem.query.filter_by(status='Stored').all()
    
    match_id_counter = 100
    for l in all_lost:
        for f in all_found:
            score = 0
            # خوارزمية المطابقة بالنسب المحددة
            if l.category and f.category and l.category == f.category: score += 40
            if l.color and f.color and l.color == f.color: score += 20
            if l.date_lost and f.date_found and l.date_lost == f.date_found: score += 25
            if l.location and f.location and l.location == f.location: score += 15
            
            if score >= 40:
                matches_list.append({
                    'match_id': match_id_counter,
                    'lost': l,
                    'found': f,
                    'score': score
                })
                match_id_counter += 1
                
    matches_list = sorted(matches_list, key=lambda k: k['score'], reverse=True)
    return render_template('matches.html', matches=matches_list)

@app.route('/lost_reports_admin')
def lost_reports_admin():
    if not session.get('admin_logged_in'): return redirect(url_for('admin_login'))
    return render_template('lost_reports_admin.html', items=LostItem.query.all())

@app.route('/found_reports_admin')
def found_reports_admin():
    if not session.get('admin_logged_in'): return redirect(url_for('admin_login'))
    return render_template('found_reports_admin.html', items=FoundItem.query.all())

@app.route('/logout')
def logout(): 
    session.clear()
    flash('تم تسجيل الخروج بنجاح', 'info')
    return redirect(url_for('login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # إضافة موظف تجريبي في حال كانت الداتا بيز فارغة
        if not Staff.query.filter_by(emp_id='101').first():
            db.session.add(Staff(emp_id='101', fullname='موظف تجريبي', password=generate_password_hash('1234', method='pbkdf2:sha256')))
            db.session.commit()
    app.run(debug=True)