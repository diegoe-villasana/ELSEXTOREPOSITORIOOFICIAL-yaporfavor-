#!/usr/bin/env python3
"""
Local Debug Server for Impacto Estelar Flask Application
Run this script for local development with enhanced debugging features
"""

import os
import sys
import logging
from datetime import datetime

# Add the current directory to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)
sys.path.insert(0, os.path.join(project_root, 'simul'))

# Set up enhanced logging for debugging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug.log'),
        logging.StreamHandler()
    ]
)

def setup_debug_environment():
    """Configure environment variables for local debugging"""
    # Flask debug settings
    os.environ['FLASK_DEBUG'] = '1'
    os.environ['FLASK_ENV'] = 'development'
    os.environ['PYTHONDONTWRITEBYTECODE'] = '1'
    
    # Set default values for API keys if not present
    if not os.environ.get('NASA_API_KEY'):
        os.environ['NASA_API_KEY'] = 'DEMO_KEY'  # NASA allows DEMO_KEY for testing
        print("⚠️  Using NASA DEMO_KEY - get your own at https://api.nasa.gov/")
    
    if not os.environ.get('GEMINI_API_KEY'):
        print("⚠️  GEMINI_API_KEY not set - AI features may not work")
    
    print(f"🚀 Debug environment configured at {datetime.now()}")

def main():
    """Main function to run the debug server"""
    setup_debug_environment()
    
    try:
        from simul.app import create_app
        
        # Create Flask app with debug configuration
        app = create_app()
        
        # Additional debug configurations
        app.config['DEBUG'] = True
        app.config['TESTING'] = True
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        
        print("\n" + "="*60)
        print("🐛 IMPACTO ESTELAR - DEBUG MODE")
        print("="*60)
        print(f"📁 Project root: {project_root}")
        print(f"🌐 Server URL: http://localhost:5001")
        print(f"📝 Debug log: {os.path.join(project_root, 'debug.log')}")
        print(f"🔄 Auto-reload: Enabled")
        print(f"📊 Template reload: Enabled")
        print("="*60)
        print("📋 Available endpoints:")
        
        # List all routes for debugging
        with app.app_context():
            for rule in app.url_map.iter_rules():
                methods = rule.methods or set()
                filtered_methods = [m for m in methods if m not in {'HEAD', 'OPTIONS'}]
                methods_str = ','.join(sorted(filtered_methods))
                print(f"  {rule.rule:<30} [{methods_str}] -> {rule.endpoint}")
        
        print("="*60)
        print("🛠️  Debug controls:")
        print("  • Ctrl+C to stop server")
        print("  • Ctrl+R to reload in browser")
        print("  • Check debug.log for detailed logs")
        print("="*60)
        
        # Start the development server
        app.run(
            host='0.0.0.0',
            port=5001,
            debug=True,
            use_reloader=True,
            use_debugger=True,
            threaded=True
        )
        
    except ImportError as e:
        print(f"❌ Import Error: {e}")
        print("💡 Make sure you're in the virtual environment:")
        print("   source venv/bin/activate")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        logging.exception("Server startup failed")
        sys.exit(1)

if __name__ == '__main__':
    main()